import { useState, useEffect, createContext, useContext, useMemo } from "react";
import apiClient from "../api/ApiClient";

interface AuthContextProps {
  children: React.ReactNode;
}

type AuthState = {
  user: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await apiClient.get<{ user: { email: string } }>("/auth/me");
      setUser(res.data.user.email);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const logout = async () => {
    await apiClient.post("/auth/logout");
    setUser(null);
  };

  const login = async (email: string) => {
    await apiClient.post("/auth/login", { email });
    await refresh();
  };

  const value = useMemo(
    () => ({ user, loading, refresh, logout, login }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthProvider;
