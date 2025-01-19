import { useEffect, useState, createContext, useContext } from 'react';

import type { IAuthStore } from '@/types';
import { AuthService } from '@/utils';

interface AuthContextValue {
  /** 인증 관련 메서드들을 제공하는 서비스 */
  authService: AuthService;
  /** 초기 인증 상태 확인 진행 여부를 나타내기 위한 값 */
  isCheckingAuthState: boolean;
  /** 현재 로그인된 사용자 정보를 저장하기 위한 객체 */
  user: IAuthStore | null;
  /** 인증 과정에서 발생한 에러를 저장하기 위한 객체 */
  error: AuthError | null;
}

interface AuthError {
  message: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const authService = new AuthService();

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IAuthStore | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  // 초기 인증 상태 확인 진행 여부를 관리하기 위한 상태.
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribe = authService
      .initializeUserFromCookie() // 쿠키에서 저장된 사용자 정보를 불러옵니다.
      .subscribeToAuthState((user, error) => {
        if (user) {
          // 사용자가 있을 경우 상태를 업데이트합니다.
          setUser(user);
          setError(null);
        } else {
          // 사용자가 없을 경우 상태 초기화.
          setUser(null);

          if (error) {
            setError(error);
          }
        }

        setIsCheckingAuthState(false);
      });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextValue = {
    user,
    error,
    authService,
    isCheckingAuthState,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
