import { useEffect, useState, createContext, useContext } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { IAuthState } from '@ahhachul/schemas';

import { Auth } from '@/utils';

export const auth = new Auth();

const redirectKey = 'sign_in_redirect';

export const AuthContext = createContext<
  | {
      auth: Auth;
      initializing: boolean;
      user: IAuthState | null;
      error: { message: string } | null;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(redirectKey, redirect);
}

function getRedirect(): string | null {
  return window.sessionStorage.getItem(redirectKey);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey);
}
export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return auth;
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<IAuthState | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [initializing, setInitializing] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    auth.resolveUser().onAuthStateChanged((user: IAuthState | null, error) => {
      if (user) {
        setUser(user);
        setError(null);
      } else {
        setUser(null);
        queryClient.clear();
        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, []);

  const value = {
    user,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
