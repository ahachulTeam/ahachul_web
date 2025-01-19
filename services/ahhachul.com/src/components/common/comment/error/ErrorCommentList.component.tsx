import type { AxiosError } from 'axios';

import { ErrorGraphic } from '@/assets/graphics';
import { WarningIcon } from '@/assets/icons/system';

import * as S from './ErrorCommentList.styled';

interface ErrorCommentListProps {
  error: AxiosError;
  reset: () => void;
}

const ErrorCommentList = ({ reset }: ErrorCommentListProps) => {
  // sendError(error)

  return (
    <S.ErrorContainer>
      <ErrorGraphic />
      <S.Desc>
        <WarningIcon />
        <p>오류가 발생했습니다.</p>
      </S.Desc>
      <S.RetryBtn onClick={reset}>다시 시도</S.RetryBtn>
    </S.ErrorContainer>
  );
};

export default ErrorCommentList;
