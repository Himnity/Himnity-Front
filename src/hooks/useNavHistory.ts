import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type NavigationEntry = {
  path: string;
  timestamp: number;
};

const NAV_HISTORY_KEY = "nav-history";
const MAX_ENTRIES = 10;

const mainRoutes = new Set(["/", "/events", "/storybook", "/hall-of-fame", "/profile"]);

const readHistory = (): NavigationEntry[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(NAV_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NavigationEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => typeof entry?.path === "string" && typeof entry?.timestamp === "number");
  } catch {
    return [];
  }
};

const writeHistory = (entries: NavigationEntry[]) => {
  if (typeof window === "undefined") return;
  try {
    const toSave = entries.slice(-MAX_ENTRIES);
    window.sessionStorage.setItem(NAV_HISTORY_KEY, JSON.stringify(toSave));
  } catch {
    // ignore write errors
  }
};

export const useNavHistory = () => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    if (previousPath.current === currentPath) {
      return;
    }

    previousPath.current = currentPath;

    if (!mainRoutes.has(currentPath)) {
      return;
    }

    const history = readHistory();
    if (history.length > 0 && history[history.length - 1]?.path === currentPath) {
      return;
    }

    history.push({ path: currentPath, timestamp: Date.now() });
    writeHistory(history);
  }, [location.pathname]);
};

export const getLastMainRoute = (): string | null => {
  const history = readHistory();
  if (history.length === 0) return null;
  return history[history.length - 1]?.path ?? null;
};

export const getPreviousMainRoute = (): string | null => {
  const history = readHistory();
  if (history.length < 2) return null;
  const previous = history[history.length - 2];
  return previous?.path ?? null;
};
