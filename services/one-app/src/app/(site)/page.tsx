import PlusIcon from '@/common/assets/icons/PlusIcon';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-row bg-slate-50 sm:flex-col gap-3">
      <h1 className="text-2xl font-bold">App Router</h1>
      <h5>PC: 정렬 가로</h5>
      <h5>모바일: 정렬 세로</h5>
      <PlusIcon />
    </div>
  );
}
