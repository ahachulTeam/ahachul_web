import React, { useCallback } from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';
import { Theme } from '@emotion/react';
import { EditorState } from 'lexical';

const CommunityEditor = () => {
  const handleChangeContent = useCallback((targetValue: EditorState) => {
    let value = targetValue;

    console.log('value :', value);
  }, []);

  return (
    <Layout
      appBar={{
        title: '글 작성',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <div css={inputGroup}>
          <span>제목</span>
          <input placeholder="제목" />
        </div>
        <div css={inputGroup}>
          <span>자세한 설명</span>
          <UiComponent.Editor onChange={handleChangeContent} />
        </div>
      </main>
    </Layout>
  );
};

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 0 48px 0' }];

const inputGroup = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    marginBottom: '24px',

    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#9da5b6',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },
    },
  }),
];

export default CommunityEditor;
