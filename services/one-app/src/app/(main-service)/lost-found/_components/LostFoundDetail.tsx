'use client';

import { useGetLostFoundDetail } from '../_lib';

type Params = {
  lostId: string;
};

const LostFoundDetail = ({ lostId }: Params) => {
  const { data } = useGetLostFoundDetail(Number(lostId));

  return <div>{data?.title}</div>;
};

export default LostFoundDetail;
