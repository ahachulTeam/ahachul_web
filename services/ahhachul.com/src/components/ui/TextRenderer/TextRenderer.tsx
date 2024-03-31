import React from 'react';
import { css } from '@emotion/react';
import { UiComponent } from 'components';

export const lostContentMock = {
  root: {
    children: [
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '오늘 아침 7기 30분에', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '누가 구찌 지갑 흘리셨는데',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '이거 주워놨습니다.', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: '연락주세요!!', type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

export type AwesomeRendererProps = {
  article: string;
};

function TextRenderer({ article }: AwesomeRendererProps) {
  console.log('article:', article);

  return (
    <div css={wrapperStyle}>
      <UiComponent.Editor readonly initialState={JSON.stringify(lostContentMock)} />
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
