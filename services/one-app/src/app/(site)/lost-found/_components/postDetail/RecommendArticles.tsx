import React from 'react';
import ChevronRightIcon from '@/common/assets/icons/svgs/chevron.svg';
import type { RecommendPost } from '@/model/Post';
import RecommendArticleCard from '@/common/components/Article/RecommendArticleCard';

interface Props {
  posts: RecommendPost[];
}

const RecommendArticles = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <section>
      <div className=" h-12 pl-5 flex items-center border-b border-b-gray-30">
        <span className=" text-gray-90 text-title-large">추천 습득물</span>
        <ChevronRightIcon />
      </div>
      {posts.map((post) => (
        <RecommendArticleCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default RecommendArticles;
