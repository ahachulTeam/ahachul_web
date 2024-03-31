import React from 'react';
import { css } from '@emotion/react';

export type AwesomeRendererProps = {
  article: string;
};

function TextRenderer({ article }: AwesomeRendererProps) {
  console.log('article:', article);

  return <div css={wrapperStyle}></div>;
}

const wrapperStyle = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

export default TextRenderer;
