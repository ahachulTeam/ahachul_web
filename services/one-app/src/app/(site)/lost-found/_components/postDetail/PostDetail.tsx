'use client';

import React from 'react';
import { useGetLostFoundDetail } from '../../_lib/get';

type Props = {
  lostId: string;
};

const LostFoundPostDetail = ({ lostId }: Props) => {
  const { data } = useGetLostFoundDetail(lostId);

  return <article className=" pb-6">{data.title}</article>;
};

export default LostFoundPostDetail;
