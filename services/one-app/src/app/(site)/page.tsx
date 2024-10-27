import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/PlusIcon';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>App Router</h1>
      <PlusIcon />
      <Link href="/login">로그인</Link>
    </main>
  );
}
