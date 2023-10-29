import Link from 'next/link'
import PageTemplate from '../public/PageTemplate'
import { useMyProfileQuery } from '@/services'

function MyPageMainScreen() {
  const { data: myProfile, refetch } = useMyProfileQuery({ enabled: false })

  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        안녕하세요 아하철 MyPage입니다.
        <br />
        내 정보 확인하기 버튼을 클릭해 주세요.
        <br />
        <br />
        <button type="button" onClick={() => refetch()}>
          내 정보 확인하기
        </button>
        <br />
        <br />
        {myProfile && (
          <div>
            <strong>닉네임: {myProfile?.nickname}</strong>
            <br />
            <span>성별: {myProfile?.gender}</span>
            <br />
            <span>연령대: {myProfile?.ageRange}</span>
          </div>
        )}
        <br />
        혹은
        <br />
        <Link href="/onboarding/nickname">프로필을 수정하시겠습니까 ?</Link>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  )
}

export default MyPageMainScreen
