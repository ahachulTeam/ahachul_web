'use client';

import React from 'react';
import { useGetLostFoundDetail } from '../_lib/get';

type Params = {
  lostId: string;
};

const LostFoundDetail = ({ lostId }: Params) => {
  const { data } = useGetLostFoundDetail(Number(lostId));

  return <div>{data?.title}</div>;
};

export default LostFoundDetail;
