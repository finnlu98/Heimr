import { useState, useEffect, createContext, useContext, useMemo } from "react";
import apiClient from "../api/ApiClient";
import { User } from "../model/User";

interface AuthContextProps {
  children: React.ReactNode;
}

type AuthState = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePersonalia: (user: Partial<User>, file: File | null) => Promise<void>;
};
const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  const refresh = async () => {
    try {
      const res = await apiClient.get<{ user: User }>("/auth/me");
      setUser(res.data.user);
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

  const updatePersonalia = async (user: Partial<User>, file: File | null) => {
    if (!user) return;

    const formData = new FormData();
    if (user.name) formData.append("name", user.name);
    if (file) formData.append("avatar", file);

    console.log("Updating personalia with", user, formData);

    try {
      await apiClient.put<{ user: User }>("/auth/me/personalia", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await refresh();
    } catch (error) {
      console.error("Failed to update personalia", error);
    }
  };

  const value = useMemo(() => ({ user, loading, refresh, logout, login, updatePersonalia }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthProvider;
