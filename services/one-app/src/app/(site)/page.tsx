import Link from 'next/link';
<<<<<<< HEAD
=======
import PlusIcon from '@/common/assets/icons/plus';
>>>>>>> main
import LoggedIn from './_component/LoggedIn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
<<<<<<< HEAD
        <Link href={'/login'}>로그인 페이지</Link>
        <LoggedIn />
        <Link href={'/lost-found'}>유실물 페이지</Link>
      </div>
    </main>
=======
        <Link href={'/login'}>
          <PlusIcon />
        </Link>
        <LoggedIn />
      </div>
    </main >
>>>>>>> main
  );
}
