import React from 'react';
import { css } from '@emotion/react';
import { UiComponent } from 'components';

export type AwesomeRendererProps = {
  article: string;
};

function TextRenderer({ article }: AwesomeRendererProps) {
  return (
    <div css={wrapperStyle}>
      <UiComponent.Editor readonly initialState={article} />
    </div>
  );
}

const wrapperStyle = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

export default TextRenderer;
