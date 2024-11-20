// import Link from 'next/link';
import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지를 구경해보세요.</div>
      {/* <Link href="/">이동</Link> */}
    </div>
  );
};

export default NotFound;
