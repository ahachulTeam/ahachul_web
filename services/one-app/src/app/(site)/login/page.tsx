import { Metadata } from 'next';
import SocialLogins from './_component/SocialLogins';
import Error from './_component/Error';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Error />
      <h1>App Login</h1>
      <SocialLogins />
    </main>
  );
}