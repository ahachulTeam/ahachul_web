import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';
import LoggedIn from './_component/LoggedIn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/login'}>
          <PlusIcon />
        </Link>
        <LoggedIn />
      </div>
    </main >
  );
}
