import Link from 'next/link';

import { Layout } from '@/src/components/layout';
import { getKakaoApiKey, getGoogleApiKey, getDomainName, getGoogleScope } from '@/src/utils/appEnv';

const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${getKakaoApiKey()}&redirect_uri=${getDomainName()}/onboarding/redirect?type=KAKAO&response_type=code`;
const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${getGoogleApiKey()}&redirect_uri=${getDomainName()}/onboarding/redirect?type=GOOGLE&access_type=offline&response_type=code&scope=${getGoogleScope()}`;

export default function SignIn() {
  return (
    <Layout headerType="back" title="로그인" nav={false}>
      <div css={{ padding: '14px 20px', display: 'flex', flexDirection: 'column' }}>
        <Link
          href={kakaoUrl}
          css={{
            height: '80px',
            color: '#fff',
            borderBottom: '1px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          카카오 로그인
        </Link>
        <Link
          href={googleUrl}
          css={{ height: '80px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          구글 로그인
        </Link>
      </div>
    </Layout>
  );
}
