interface CommunityDetailPageProps {
  params: {
    slug: string;
  };
}

function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { slug } = params;
  return <div>커뮤니티 {slug} 상세페이지</div>;
}

export default CommunityDetailPage;
