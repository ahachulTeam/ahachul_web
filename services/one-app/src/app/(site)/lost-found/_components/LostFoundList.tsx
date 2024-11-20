'use client';

import React from 'react';
import Link from 'next/link';

import { useGetLostFoundList } from '../_lib/get';
import { flattenInfinityList } from '@/common/utils/react-query';

const LostFoundList = () => {
  const { data } = useGetLostFoundList({
    pageSize: 10,
    lostType: 'ACQUIRE',
  });

  console.log({ data });

  const lostArticles = flattenInfinityList(data);

  console.log('lostArticles:', lostArticles);

  return lostArticles.map((item) => (
    <Link key={item.id} href={`/lost-found/${item.id}`}>
      {item.title}
    </Link>
  ));
};

export default LostFoundList;
