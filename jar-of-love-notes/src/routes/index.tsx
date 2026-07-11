import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useNotes, loadRecipient } from "@/lib/use-notes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "100 Reasons — A Jar for You" },
      { name: "description", content: "A little jar holding 100 reasons I love you. Open one whenever you need it." },
      { property: "og:title", content: "100 Reasons — A Jar for You" },
      { property: "og:description", content: "A little jar holding 100 reasons I love you. Open one whenever you need it." },
    ],
  }),
  component: Index,
});

const getStorageKey = () => {
  if (typeof window === "undefined") return "jar-opened-v1";
  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("jar");
    if (token) return `jar-opened-${token.slice(0, 12)}`;
  } catch {}
  return "jar-opened-v1";
};

function Index() {
  const notes = useNotes();
  const [opened, setOpened] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [recipient, setRecipient] = useState("my love");

  const storageKey = getStorageKey();

  useEffect(() => {
    setRecipient(loadRecipient());
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setOpened(JSON.parse(raw));
      else setOpened([]);
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(opened));
    } catch {}
  }, [opened, storageKey]);

  const remaining = useMemo(
    () => notes.map((_, i) => i).filter((i) => !opened.includes(i)),
    [opened, notes],
  );

  const drawNote = () => {
    if (remaining.length === 0 || drawing) return;
    setDrawing(true);
    setTimeout(() => {
      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrent(pick);
      setOpened((o) => [...o, pick]);
      setDrawing(false);
    }, 700);
  };

  const closeNote = () => setCurrent(null);

  const resetJar = () => {
    setOpened([]);
    setCurrent(null);
  };

  const openedCount = opened.length;
  const total = notes.length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="starfield" />
      {/* moon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.15 85 / 0.35) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-between px-6 py-10 text-center">
        <header className="space-y-3">
          <p className="font-hand text-2xl text-rose">for you, {recipient}</p>
          <h1 className="font-display text-5xl leading-tight text-foreground sm:text-6xl">
            One hundred little reasons
          </h1>
          <p className="mx-auto max-w-sm text-base italic text-muted-foreground">
            Tap the jar whenever you want one. Keep it, fold it, smile, repeat.
          </p>
        </header>

        <button
          type="button"
          onClick={drawNote}
          disabled={remaining.length === 0 || drawing}
          aria-label="Draw a note from the jar"
          className="group my-8 cursor-pointer select-none border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full disabled:cursor-default"
        >
          <Jar drawing={drawing} count={total - openedCount} />
        </button>

        <footer className="space-y-3">
          <p className="font-display text-lg text-foreground/90">
            <span className="text-gold">{openedCount}</span>
            <span className="text-muted-foreground"> of {total} opened</span>
          </p>
          {openedCount > 0 && (
            <button
              onClick={resetJar}
              className="font-hand text-base text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-rose"
            >
              refill the jar
            </button>
          )}
          <p className="pt-2 font-hand text-base text-muted-foreground">
            made with all my heart ♡
          </p>
        </footer>
      </main>

      {current !== null && <NoteOverlay text={notes[current]} index={current} onClose={closeNote} />}
    </div>
  );
}

function Jar({ drawing, count }: { drawing: boolean; count: number }) {
  return (
    <div className={`relative ${drawing ? "" : "jar-float"}`}>
      <svg
        width="240"
        height="300"
        viewBox="0 0 240 300"
        className="glow transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
      >
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.1 290)" stopOpacity="0.45" />
            <stop offset="50%" stopColor="oklch(0.7 0.12 285)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.4 0.1 290)" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.13 88)" />
            <stop offset="100%" stopColor="oklch(0.68 0.16 75)" />
          </linearGradient>
          <radialGradient id="noteGrad" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="oklch(0.95 0.05 90)" />
            <stop offset="100%" stopColor="oklch(0.82 0.1 60)" />
          </radialGradient>
        </defs>

        {/* lid band */}
        <rect x="56" y="30" width="128" height="34" rx="6" fill="url(#lidGrad)" />
        <rect x="56" y="30" width="128" height="6" rx="3" fill="oklch(1 0 0 / 0.4)" />
        <rect x="60" y="58" width="120" height="6" rx="3" fill="oklch(0 0 0 / 0.2)" />

        {/* neck */}
        <rect x="72" y="64" width="96" height="14" fill="oklch(0.45 0.1 290 / 0.5)" />

        {/* jar body */}
        <path
          d="M60 80 Q40 90 40 130 L40 250 Q40 280 80 285 L160 285 Q200 280 200 250 L200 130 Q200 90 180 80 Z"
          fill="url(#glassGrad)"
          stroke="oklch(0.85 0.08 90 / 0.5)"
          strokeWidth="1.5"
        />

        {/* highlight */}
        <path
          d="M58 110 Q52 130 56 200"
          stroke="oklch(1 0 0 / 0.5)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* folded notes inside */}
        <g opacity="0.95">
          {generateNotePositions(Math.min(count, 28)).map((n, i) => (
            <g
              key={i}
              transform={`translate(${n.x}, ${n.y}) rotate(${n.r})`}
              className={drawing && i === 0 ? "note-rise" : ""}
            >
              <rect
                x={-n.w / 2}
                y={-n.h / 2}
                width={n.w}
                height={n.h}
                rx="2"
                fill="url(#noteGrad)"
                stroke="oklch(0.55 0.1 60 / 0.4)"
                strokeWidth="0.5"
              />
              <line
                x1={-n.w / 2 + 2}
                y1="0"
                x2={n.w / 2 - 2}
                y2="0"
                stroke="oklch(0.55 0.1 60 / 0.35)"
                strokeWidth="0.4"
              />
            </g>
          ))}
        </g>

        {/* heart on lid */}
        <path
          d="M120 42 c -4 -6 -14 -2 -14 5 c 0 6 14 14 14 14 s 14 -8 14 -14 c 0 -7 -10 -11 -14 -5 z"
          fill="oklch(0.7 0.18 15)"
        />
      </svg>

      {/* label */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-gold/40 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
        <p className="font-hand text-base leading-none text-gold">open me</p>
      </div>
    </div>
  );
}

function generateNotePositions(count: number) {
  const arr: { x: number; y: number; r: number; w: number; h: number }[] = [];
  // deterministic pseudo-random
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const rows = [
    { y: 260, count: 7 },
    { y: 235, count: 7 },
    { y: 210, count: 6 },
    { y: 185, count: 5 },
    { y: 162, count: 3 },
  ];
  let remaining = count;
  for (const row of rows) {
    const n = Math.min(row.count, remaining);
    for (let i = 0; i < n; i++) {
      const span = 130;
      const startX = 120 - span / 2;
      const x = startX + (span / Math.max(n - 1, 1)) * i + (rand() - 0.5) * 8;
      arr.push({
        x,
        y: row.y + (rand() - 0.5) * 6,
        r: (rand() - 0.5) * 40,
        w: 18 + rand() * 6,
        h: 10 + rand() * 4,
      });
    }
    remaining -= n;
    if (remaining <= 0) break;
  }
  return arr;
}

function NoteOverlay({
  text,
  index,
  onClose,
}: {
  text: string;
  index: number;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/93 px-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="note-in relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: "rotate(-2deg)" }}
      >
        <div
          className="relative rounded-sm border border-gold/40 px-8 py-12 text-center"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.24 0.05 295) 0%, oklch(0.18 0.04 290) 100%)",
            color: "oklch(0.96 0.02 90)",
            boxShadow: "0 20px 50px -10px oklch(0 0 0 / 0.8)",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 28px, oklch(0.96 0.02 90 / 0.04) 28px 29px)",
          }}
        >
          {/* tape */}
          <div
            className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg]"
            style={{
              background: "oklch(0.82 0.15 85 / 0.18)",
              border: "1px solid oklch(0.82 0.15 85 / 0.35)",
              boxShadow: "0 2px 6px oklch(0 0 0 / 0.3)"
            }}
          />
          <p className="font-hand text-sm uppercase tracking-[0.3em]" style={{ color: "oklch(0.82 0.15 85)" }}>
            reason no. {String(index + 1).padStart(3, "0")}
          </p>
          <p className="mt-6 font-display text-2xl md:text-3xl italic font-medium leading-snug" style={{ color: "oklch(0.96 0.02 90)" }}>
            “{text}”
          </p>
          <p className="mt-8 font-hand text-xl font-medium" style={{ color: "oklch(0.82 0.1 0)" }}>
            — yours, always ♡
          </p>
        </div>
        <button
          onClick={onClose}
          className="mx-auto mt-6 block rounded-full border border-gold/50 bg-card/60 px-6 py-2 font-hand text-lg text-gold backdrop-blur-sm transition-all hover:bg-card hover:scale-105"
        >
          tuck it back in
        </button>
      </div>
    </div>
  );
}
