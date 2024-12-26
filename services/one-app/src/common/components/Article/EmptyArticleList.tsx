import React from 'react';
import EmptyGraphic from '@/common/assets/graphics/character/no-results.svg';

const EmptyArticleList = () => {
  return (
    <section className=" pt-[60px] w-full flex flex-col items-center">
      <EmptyGraphic />
      <p className=" text-title-medium text-gray-80 pt-5">검색 결과가 없어요</p>
    </section>
  );
};

export default EmptyArticleList;
