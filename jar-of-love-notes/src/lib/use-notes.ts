import { useEffect, useState } from "react";
import { notes as defaultNotes } from "./notes";

export const NOTES_STORAGE_KEY = "jar-notes-v1";
export const RECIPIENT_STORAGE_KEY = "jar-recipient-v1";

export function encodeNotesToToken(notesList: string[], recipient: string = "my love"): string {
  const json = JSON.stringify({ notes: notesList, recipient });
  const utf8Bytes = new TextEncoder().encode(json);
  let binary = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeNotesFromToken(token: string): { notes: string[]; recipient: string } | null {
  try {
    let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return { notes: parsed, recipient: "my love" };
    }
    if (parsed && Array.isArray(parsed.notes)) {
      return { notes: parsed.notes, recipient: parsed.recipient || "my love" };
    }
  } catch (e) {
    console.error("Failed to decode share token:", e);
  }
  return null;
}

export function loadRecipient(): string {
  if (typeof window === "undefined") return "my love";
  try {
    const params = new URLSearchParams(window.location.search);
    const shareToken = params.get("jar");
    if (shareToken) {
      const decoded = decodeNotesFromToken(shareToken);
      if (decoded && decoded.recipient) return decoded.recipient;
    }
  } catch {}
  
  try {
    const raw = localStorage.getItem(RECIPIENT_STORAGE_KEY);
    return raw || "my love";
  } catch {
    return "my love";
  }
}

export function saveRecipient(name: string) {
  try {
    localStorage.setItem(RECIPIENT_STORAGE_KEY, name);
  } catch {}
}

export function loadNotes(): string[] {
  if (typeof window === "undefined") return defaultNotes;
  
  // Check URL parameters first for shared notes
  try {
    const params = new URLSearchParams(window.location.search);
    const shareToken = params.get("jar");
    if (shareToken) {
      const decoded = decodeNotesFromToken(shareToken);
      if (decoded && decoded.notes) return decoded.notes;
    }
  } catch (e) {
    console.error("Error reading URL share token:", e);
  }

  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return defaultNotes;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultNotes;
    // Always return exactly 100 entries, padded/truncated from defaults.
    const out = defaultNotes.slice();
    for (let i = 0; i < out.length; i++) {
      if (typeof parsed[i] === "string" && parsed[i].trim().length > 0) {
        out[i] = parsed[i];
      }
    }
    return out;
  } catch {
    return defaultNotes;
  }
}

export function saveNotes(notes: string[]) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export function useNotes(): string[] {
  const [notes, setNotes] = useState<string[]>(defaultNotes);
  useEffect(() => {
    setNotes(loadNotes());
    const onStorage = (e: StorageEvent) => {
      if (e.key === NOTES_STORAGE_KEY) setNotes(loadNotes());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return notes;
}