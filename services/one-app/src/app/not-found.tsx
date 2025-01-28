import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '요청하신 페이지를 찾을 수 없습니다 / 아하철 - 1등 지하철 유실물 & 민원 정보앱',
  description: '요청하신 페이지를 찾을 수 없습니다',
};

export default function NotFound() {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" text-black">이 페이지는 존재하지 않습니다. 다른 페이지를 구경해보세요.</div>
      <Link href="/" className=" text-black">
        홈으로 이동
      </Link>
    </div>
  );
}
