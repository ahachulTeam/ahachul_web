'use client';

import { useGetLostFoundDetail } from '../../_lib/get';

type Props = {
  params: {
    lostId: string;
  };
};

const LostFoundEditPage = ({ params: { lostId } }: Props) => {
  const { data } = useGetLostFoundDetail(lostId);

  return <h1>수정 페이지</h1>;
};

export default LostFoundEditPage;
