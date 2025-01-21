import type { AxiosError } from 'axios';

import { useFlow } from '@/stackflow';

import * as S from './CommunityErrorPage.styled';

interface CommunityErrorPageProps {
  error: AxiosError;
  reset: () => void;
}

const CommunityErrorPage = ({ error, reset }: CommunityErrorPageProps) => {
  const { replace } = useFlow();

  const isDeletedPost = error.response?.status === 404;

  return isDeletedPost ? (
    <S.Container>
      <S.Title>삭제된 게시글입니다.</S.Title>
      <S.RetryButton type="button" onClick={() => replace('HomePage', {}, { animate: false })}>
        홈으로 이동하기
      </S.RetryButton>
    </S.Container>
  ) : (
    <S.Container>
      <S.Title>알 수 없는 오류가 발생했습니다.</S.Title>
      <S.Description>
        계속 발생한다면 잠시 후 다시 시도해주세요. <br />
        인터넷 연결 상태가 좋지 않으면 발생할 수 있습니다.
      </S.Description>
      <S.RetryButton type="button" onClick={reset}>
        다시 시도하기
      </S.RetryButton>
    </S.Container>
  );
};

export default CommunityErrorPage;
