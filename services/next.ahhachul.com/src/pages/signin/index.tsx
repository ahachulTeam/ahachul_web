import Link from 'next/link';
import { useQueries } from '@tanstack/react-query';
import { getRedirectUrls } from '@/src/api/auth';
import { Layout } from '@/src/components/layout';

type ProviderType = 'KAKAO' | 'GOOGLE';

export default function SignIn() {
  const queries = useQueries({
    queries: ['KAKAO', 'GOOGLE'].map((type) => ({
      queryKey: ['getRedirectUrls', type],
      queryFn: () => getRedirectUrls(type as ProviderType),
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const redirectUrls = queries.reduce(
    (acc, query, index) => {
      if (query.data?.data?.result?.redirectUrl) {
        acc[['KAKAO', 'GOOGLE'][index] as ProviderType] =
          query.data.data.result.redirectUrl;
      }
      return acc;
    },
    {} as Record<ProviderType, string>,
  );

  if (isLoading) {
    return <div css={simpleIndicatorStyle}>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div css={simpleIndicatorStyle}>
        에러가 발생했습니다. 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <Layout headerType="back" title="로그인" nav={false}>
      <div
        css={{ padding: '14px 20px', display: 'flex', flexDirection: 'column' }}
      >
        <Link
          href={redirectUrls.KAKAO || '#'}
          css={[simpleIndicatorStyle, { borderBottom: '1px solid #fff' }]}
        >
          카카오 로그인
        </Link>
        <Link href={redirectUrls.GOOGLE || '#'} css={simpleIndicatorStyle}>
          구글 로그인
        </Link>
      </div>
    </Layout>
  );
}

const simpleIndicatorStyle = {
  height: '80px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
