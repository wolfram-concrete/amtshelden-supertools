"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Merkliste ohne Accounts: rein browser-lokal über localStorage. Keine
 * Server-Anbindung, kein User-Profil, nichts verlässt den Browser (DSGVO-
 * unkritisch). Pro Eintrag nur das Nötigste; das Logo rendert ToolLogo aus
 * dem Slug. Grenze: an Gerät/Browser gebunden, nicht geräteübergreifend.
 */
export interface FavoriteTool {
  slug: string;
  name: string;
  categoryLabel: string;
}

interface FavoritesContextValue {
  items: FavoriteTool[];
  count: number;
  /** true, sobald aus localStorage hydriert — vorher nicht rendern, was zu
   *  Hydration-Mismatch führen würde (z. B. der Zähler-Badge). */
  ready: boolean;
  isFavorite: (slug: string) => boolean;
  toggle: (tool: FavoriteTool) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const STORAGE_KEY = "supertools:merkliste:v1";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readStorage(): FavoriteTool[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is FavoriteTool =>
        x && typeof x.slug === "string" && typeof x.name === "string",
    );
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteTool[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  // Hydrieren (nur Client)
  useEffect(() => {
    setItems(readStorage());
    setReady(true);
  }, []);

  // Persistieren
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Speicher voll / blockiert — Merkliste bleibt für diese Sitzung erhalten */
    }
  }, [items, ready]);

  // Über Tabs hinweg synchron halten
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items],
  );

  const toggle = useCallback((tool: FavoriteTool) => {
    setItems((prev) =>
      prev.some((i) => i.slug === tool.slug)
        ? prev.filter((i) => i.slug !== tool.slug)
        : [
            ...prev,
            {
              slug: tool.slug,
              name: tool.name,
              categoryLabel: tool.categoryLabel,
            },
          ],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      items,
      count: items.length,
      ready,
      isFavorite,
      toggle,
      remove,
      clear,
      open,
      setOpen,
    }),
    [items, ready, isFavorite, toggle, remove, clear, open],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites muss innerhalb von FavoritesProvider genutzt werden");
  }
  return ctx;
}
