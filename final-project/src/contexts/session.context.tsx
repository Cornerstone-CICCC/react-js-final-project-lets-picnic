"use client";

import {
  checkCookie,
  getUserById,
  logInUser,
  logOutUser,
} from "@/app/actions/user.actions";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

interface SessionContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  check: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const result = await logInUser(email, password);
    const userData = await getUserById(result.userId);
    setUser(userData);
  };

  const logout = async () => {
    await logOutUser();
    setUser(null);
    window.location.reload();
  };

  const check = async () => {
    try {
      const result = await checkCookie();
      console.log("checkCookie result:", result);
      if (result.loggedIn) {
        const userData = await getUserById(result.userId);
        console.log("userData from getUserById:", userData);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error in check:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <SessionContext.Provider value={{ user, login, logout, check }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
