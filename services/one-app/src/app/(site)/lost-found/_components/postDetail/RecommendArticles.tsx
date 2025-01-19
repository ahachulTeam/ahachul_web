<<<<<<< HEAD
import { ChevronIcon } from '@/common/assets/icons';
import { RecommendArticleCard } from '@/common/components';
import type { RecommendPost } from '@/model';
=======
import React from 'react';

import type { RecommendPost } from '@/model';
import { ChevronIcon } from '@/common/assets/icons';
import { RecommendArticleCard } from '@/common/components';
>>>>>>> main

interface Props {
  posts: RecommendPost[];
}

export const RecommendArticles = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <section>
      <div className=" h-12 pl-5 flex items-center border-b border-b-gray-30">
        <span className=" text-gray-90 text-title-large">추천 습득물</span>
        <ChevronIcon />
      </div>
<<<<<<< HEAD
      {posts.map(post => (
=======
      {posts.map((post) => (
>>>>>>> main
        <RecommendArticleCard key={post.id} post={post} />
      ))}
    </section>
  );
};
