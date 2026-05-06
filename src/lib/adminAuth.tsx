import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "tz-admin-auth-v1";
// Simple v1 gate — replace with real auth when backend is enabled.
const ADMIN_PASSWORD = "techzetu2026";

type Ctx = {
  isAuthed: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setAuthed(true);
    } catch {}
  }, []);

  const login = (pw: string) => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      try { localStorage.setItem(KEY, "1"); } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthed(false);
    try { localStorage.removeItem(KEY); } catch {}
  };

  return <AuthCtx.Provider value={{ isAuthed, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAdminAuth = () => {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return c;
};
