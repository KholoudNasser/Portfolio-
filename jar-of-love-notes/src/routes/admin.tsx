import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { notes as defaultNotes } from "@/lib/notes";
import { encodeNotesToToken, loadNotes, saveNotes, loadRecipient, saveRecipient } from "@/lib/use-notes";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Edit the Jar — Admin" },
      { name: "description", content: "Edit the 100 notes inside the jar." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [items, setItems] = useState<string[]>(defaultNotes);
  const [recipient, setRecipient] = useState("my love");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setItems(loadNotes());
    setRecipient(loadRecipient());
  }, []);

  const dirty = useMemo(() => {
    const storedNotes = loadNotes();
    const storedRecipient = loadRecipient();
    const notesChanged = items.some((v, i) => v !== storedNotes[i]);
    const recipientChanged = recipient !== storedRecipient;
    return notesChanged || recipientChanged;
  }, [items, recipient]);

  const update = (i: number, value: string) => {
    setItems((arr) => {
      const next = arr.slice();
      next[i] = value;
      return next;
    });
  };

  const handleSave = () => {
    saveNotes(items);
    saveRecipient(recipient);
    setSavedAt(Date.now());
    setShareUrl(null);
  };

  const handleRevert = () => {
    setItems(loadNotes());
    setRecipient(loadRecipient());
    setShareUrl(null);
  };

  const handleResetDefaults = () => {
    if (!confirm("Replace all notes and the recipient name with original defaults? This will overwrite your edits.")) return;
    setItems(defaultNotes.slice());
    setRecipient("my love");
    setShareUrl(null);
  };

  const handleShare = () => {
    try {
      // Auto-save changes first if dirty
      if (dirty) {
        saveNotes(items);
        saveRecipient(recipient);
        setSavedAt(Date.now());
      }
      
      const token = encodeNotesToToken(items, recipient);
      const url = `${window.location.origin}/?jar=${token}`;
      setShareUrl(url);
      
      // Copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch (e) {
      console.error("Failed to generate link:", e);
    }
  };

  const visible = items
    .map((text, i) => ({ text, i }))
    .filter(({ text, i }) =>
      filter.trim() === ""
        ? true
        : text.toLowerCase().includes(filter.toLowerCase()) ||
          String(i + 1).includes(filter),
    );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="starfield" />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-hand text-xl text-rose">behind the jar</p>
            <h1 className="font-display text-4xl text-foreground">Edit your 100 reasons</h1>
            <p className="mt-1 text-sm italic text-muted-foreground">
              Edits are saved in this browser. Generate a link below to share them!
            </p>
          </div>
          <Link
            to="/"
            className="font-hand text-lg text-gold underline decoration-dotted underline-offset-4 hover:text-gold/80"
          >
            ← back to the jar
          </Link>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card/30 p-5 space-y-3">
          <label htmlFor="recipient-name" className="block font-display text-lg text-gold font-medium">
            Recipient Name (e.g. my love, bestie, mom, alex)
          </label>
          <input
            id="recipient-name"
            type="text"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setShareUrl(null);
            }}
            placeholder="e.g. my love, bestie, mom"
            className="w-full max-w-md rounded-md border border-border bg-card/60 px-3 py-2 font-display text-lg text-foreground focus:border-gold focus:outline-none"
          />
          <p className="text-xs italic text-muted-foreground">
            This name will replace "my love" in the header ("for you, [Name]") when they open the jar.
          </p>
        </div>

        <div className="sticky top-0 z-20 -mx-6 mt-6 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-6 py-4 backdrop-blur-md">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search notes…"
            className="flex-1 min-w-[180px] rounded-md border border-border bg-card/60 px-3 py-2 font-display text-base text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
          />
          <button
            onClick={handleRevert}
            disabled={!dirty}
            className="rounded-md border border-border bg-card/60 px-4 py-2 font-hand text-base text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            revert
          </button>
          <button
            onClick={handleResetDefaults}
            className="rounded-md border border-border bg-card/60 px-4 py-2 font-hand text-base text-muted-foreground transition-colors hover:text-rose"
          >
            reset to defaults
          </button>
          <button
            onClick={handleSave}
            disabled={!dirty}
            className="rounded-md border border-gold/60 px-5 py-2 font-display text-base font-medium text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
            style={{ background: "var(--gradient-gold)" }}
          >
            {dirty ? "save changes" : savedAt ? "saved ✓" : "all saved"}
          </button>
          <button
            onClick={handleShare}
            className="rounded-md px-5 py-2 font-display text-base font-medium text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(to right, oklch(0.65 0.22 15), oklch(0.55 0.22 20))" }}
          >
            {copied ? "link copied! ✓" : "share this jar"}
          </button>
        </div>

        {shareUrl && (
          <div className="mt-4 rounded-md border border-gold/40 bg-gold/5 p-4 space-y-2">
            <p className="font-display text-sm text-gold font-medium">Your customized shareable link is ready!</p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 rounded border border-border bg-background/50 px-3 py-1 font-mono text-xs text-foreground focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="rounded bg-gold px-3 py-1 font-display text-xs font-medium text-primary-foreground transition-colors hover:bg-gold/80"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="font-hand text-sm text-muted-foreground">
              Send this link to your partner. They will see your custom messages when they open the jar!
            </p>
          </div>
        )}

        {savedAt && !dirty && !shareUrl && (
          <p className="mt-3 font-hand text-base text-gold">
            saved at {new Date(savedAt).toLocaleTimeString()} — go open the jar ♡
          </p>
        )}

        <ul className="mt-6 space-y-3">
          {visible.map(({ text, i }) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-card/40 p-3 transition-colors focus-within:border-gold/60"
            >
              <span className="mt-2 w-10 shrink-0 text-right font-hand text-base text-gold">
                {String(i + 1).padStart(3, "0")}
              </span>
              <textarea
                value={text}
                onChange={(e) => update(i, e.target.value)}
                rows={2}
                className="flex-1 resize-y rounded-md border border-transparent bg-background/40 px-3 py-2 font-display text-lg leading-snug text-foreground focus:border-gold focus:outline-none"
              />
            </li>
          ))}
          {visible.length === 0 && (
            <li className="rounded-md border border-dashed border-border p-6 text-center font-hand text-lg text-muted-foreground">
              nothing matches "{filter}"
            </li>
          )}
        </ul>

        <p className="mt-8 text-center font-hand text-sm text-muted-foreground/70">
          tip: notes saved here load automatically on the jar page (same browser).
        </p>
      </main>
    </div>
  );
}
