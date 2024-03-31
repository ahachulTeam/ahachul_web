import React from 'react';
import { css } from '@emotion/react';
import { UiComponent } from 'components';

export const lostContentMock = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '구찌 지갑을 잃어버렸어요..',
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
          { detail: 0, format: 0, mode: 'normal', style: '', text: '4월 1일 오전 8시 30분 ', type: 'text', version: 1 },
          { detail: 0, format: 0, mode: 'normal', style: '', text: '#서초역에서', type: 'hashtag', version: 1 },
          { detail: 0, format: 0, mode: 'normal', style: '', text: ' 내릴 때 실수로', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '의자에 두고 왔습니다.', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: '흠 ㅠㅠ. ', type: 'text', version: 1 }],
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
            text: '혹시 주우신 분 계시면 연락 부탁드릴게요..!!',
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
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '#사례', type: 'hashtag', version: 1 },
          { detail: 0, format: 0, mode: 'normal', style: '', text: ' 있습니다!!', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: '🙇‍♂️🙇‍♂️', type: 'text', version: 1 }],
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
