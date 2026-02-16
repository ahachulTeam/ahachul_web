import { css } from '@emotion/react';

import { CommentEmptyState } from '@ahhachul/ui';

import { EmptyGraphic } from '@/assets/graphics';

interface Props {
  overrideCss?: ReturnType<typeof css>;
}

const EmptyCommentList = ({ overrideCss }: Props) => {
  return (
    <div css={overrideCss}>
      <CommentEmptyState
        illustration={<EmptyGraphic />}
        style={{
          padding: '64px 0 128px',
          minHeight: 'unset',
        }}
      />
    </div>
  );
};

export default EmptyCommentList;
