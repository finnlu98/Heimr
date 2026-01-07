import { useState, useEffect, createContext, useContext, useMemo } from "react";
import apiClient from "../api/ApiClient";
import { User } from "../model/User";
import { Home } from "../model/Home";

interface AuthContextProps {
  children: React.ReactNode;
}

type AuthState = {
  user: User | null;
  home: Home | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePersonalia: (user: Partial<User>, file: File | null) => Promise<void>;
  getHome: () => Promise<void>;
  createHome: () => Promise<void>;
  updateHome: (homeData: Partial<Home>, file: File | null) => Promise<void>;
  addHomeMember: (email: string) => Promise<User | null>;
  deleteHomeMember: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await apiClient.get<{ user: User }>("/auth/me");
      setUser(res.data.user);
      await getHome();
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getHome = async () => {
    try {
      const res = await apiClient.get<{ home: Home }>("/auth/me/home");
      setHome(res.data.home);
    } catch (error) {
      console.error("Failed to fetch home data", error);
    }
  };

  const createHome = async () => {
    try {
      const res = await apiClient.post<{ home: Home }>("/auth/me/home");
      setHome(res.data.home);
    } catch (error) {
      console.error("Failed to create home", error);
    }
  };

  const updateHome = async (homeData: Partial<Home>, file: File | null) => {
    if (!home) return;
    const formData = new FormData();
    if (homeData.name) formData.append("name", homeData.name);
    if (homeData.location) formData.append("location", JSON.stringify(homeData.location));
    if (file) formData.append("banner", file);
    console.log("Updating home with data:", homeData.location);
    try {
      const updatedHome = await apiClient.put<{ home: Home }>("/auth/me/home", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setHome(updatedHome.data.home);
    } catch (error) {
      console.error("Failed to update home", error);
    }
  };

  const addHomeMember = async (email: string): Promise<User | null> => {
    if (!home) return null;
    try {
      const res = await apiClient.post<{ user: User }>(`/auth/me/home/members`, { email });
      setHome({ ...home, users: [...(home.users || []), res.data.user] });
      return res.data.user;
    } catch (error) {
      console.error("Failed to add home member", error);
      return null;
    }
  };

  const deleteHomeMember = async (email: string): Promise<void> => {
    if (!home) return;
    try {
      await apiClient.delete(`/auth/me/home/members`, { data: { email } });
      setHome({ ...home, users: home.users?.filter((user) => user.email !== email) });
    } catch (error) {
      console.error("Failed to delete home member", error);
    }
  };

  useEffect(() => {
    refresh();
    getHome();
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

  const value = useMemo(
    () => ({
      user,
      home,
      loading,
      refresh,
      logout,
      login,
      updatePersonalia,
      getHome,
      createHome,
      updateHome,
      addHomeMember,
      deleteHomeMember,
    }),
    [user, home, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthProvider;
