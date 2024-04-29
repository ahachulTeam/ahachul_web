import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../providers/AuthProvider';
import { PATH } from '../data';

function withAuth<Props = Record<string, never>>(WrappedComponent: ComponentType<Props>) {
  return function AuthenticatedComponent(props: Props) {
    const { auth, initializing } = useAuth();
    const router = useRouter();

    if (initializing) {
      return null;
    }

    if (!auth.accessToken) {
      router.replace(PATH.signin);

      return null;
    }

    return <WrappedComponent {...(props as any)} />;
  };
}

export default withAuth;
