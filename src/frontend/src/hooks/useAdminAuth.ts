import { useCallback, useEffect, useState } from "react";

const ADMIN_PASSWORD = "SohamBhai";
const SESSION_KEY = "sohamxmods_admin_session";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (authenticated) {
        sessionStorage.setItem(SESSION_KEY, "true");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // ignore
    }
  }, [authenticated]);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
  }, []);

  return { authenticated, login, logout };
}
