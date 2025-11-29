import React, { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isManager: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Mock users for demo - stored in localStorage
const getStoredUsers = (): (User & { password: string })[] => {
  const stored = localStorage.getItem("systemUsers");
  if (stored) {
    return JSON.parse(stored);
  }
  const defaultUsers = [
    {
      id: 1,
      firstName: "علی",
      lastName: "احمدی",
      username: "manager",
      password: "manager123",
      role: "Manager" as const,
      branchId: 1,
      isActive: true,
    },
    {
      id: 2,
      firstName: "سارا",
      lastName: "محمدی",
      username: "operator",
      password: "operator123",
      role: "Operator" as const,
      branchId: 1,
      isActive: true,
    },
  ];
  localStorage.setItem("systemUsers", JSON.stringify(defaultUsers));
  return defaultUsers;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const mockUsers = getStoredUsers();
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password && u.isActive
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isManager = user?.role === "Manager";

  return (
    <AuthContext.Provider value={{ user, login, logout, isManager }}>
      {children}
    </AuthContext.Provider>
  );
};
