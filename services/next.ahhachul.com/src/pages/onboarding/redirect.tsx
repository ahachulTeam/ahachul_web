import { useLogin } from '@/src/queries/auth';
import { SocialSignInType } from '@/src/types';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpRedirect() {
  const searchParams = useSearchParams();
  const providerCode = searchParams.get('code');
  const providerType = searchParams.get('type') as SocialSignInType;

  const { mutateAsync: signIn } = useLogin();

  useEffect(() => {
    if (!(providerCode && providerType)) return;

    signIn({
      providerCode,
      providerType,
    });
  }, [providerCode, providerType]);

  return <main></main>;
}
