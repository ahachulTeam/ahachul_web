import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row text-black bg-white ">
      <div className="flex flex-row sm:flex-col gap-3">
        <h1 className="text-2xl font-bold">App Router</h1>
        <p>PC: 정렬 가로</p>
        <p>모바일: 정렬 세로</p>
        <Link href={'/login'}>
          <PlusIcon />
        </Link>
      </div>
    </main>
  );
}
