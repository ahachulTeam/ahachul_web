import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/PlusIcon';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row bg-slate-50 ">
      <div className="flex flex-row sm:flex-col gap-3">
        <h1 className="text-2xl font-bold">App Router</h1>
        <p>PC: 정렬 가로</p>
        <p>모바일: 정렬 세로</p>
        <PlusIcon />
      </div>
    </main>
  );
}
