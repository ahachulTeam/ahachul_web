import { css } from '@emotion/react';

import { EmptyGraphic } from '@/assets/graphics';

import * as S from './EmptyCommentList.styled';

interface Props {
  overrideCss?: ReturnType<typeof css>;
}

const EmptyCommentList = ({ overrideCss }: Props) => {
  return (
    <S.EmptyContainer css={overrideCss}>
      <EmptyGraphic />
      <S.Desc>
        <p>댓글이 없어요.</p>
        <p>첫 댓글을 남겨주세요.</p>
      </S.Desc>
    </S.EmptyContainer>
  );
};

export default EmptyCommentList;
