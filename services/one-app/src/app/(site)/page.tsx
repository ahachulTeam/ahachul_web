import Link from 'next/link';
import LoggedIn from './_component/LoggedIn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/login'}>로그인 페이지</Link>
        <LoggedIn />
        <Link href={'/lost-found'}>유실물 페이지</Link>
        <Link href={'/lost-found/create'}>유실물 등록하기</Link>
      </div>
    </main>
  );
}
