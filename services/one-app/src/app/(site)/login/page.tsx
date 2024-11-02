'use client';

import SocialLogins from './_component/SocialLogins';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { returnTo } = router.query;

    if (returnTo) {
      router.push(returnTo as string);
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>App Login</h1>
      <SocialLogins />
    </main>
  );
}
