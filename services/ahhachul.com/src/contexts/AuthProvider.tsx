import { useQueryClient } from "@tanstack/react-query";
import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  startTransition,
} from "react";

import { Account as UserModel } from "~/models/account";

import { Auth } from "~/utils/authentication/auth";

export const auth = new Auth();

interface AuthContextValue {
  auth: Auth;
  initializing: boolean;
  user: UserModel | null;
  error: { message: string } | null;
  isLoggedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const contextValue = React.useContext(AuthContext);

  if (!contextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return contextValue;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserModel | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.resolveUser().onAuthStateChanged((_user: UserModel | null, _error) => {
      startTransition(() => {
        if (_user) {
          setUser(_user);
          setError(null);
        } else {
          setUser(null);
          setTimeout(() => queryClient.clear(), 500);
          if (_error) {
            setError(_error);
          }
        }
        setInitializing(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      error,
      auth,
      initializing,
      isLoggedIn: Boolean(user?.accessToken),
    }),
    [error, initializing, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
