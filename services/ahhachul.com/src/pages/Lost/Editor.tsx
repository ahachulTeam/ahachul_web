import React, { useCallback } from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';
import IconChevron from 'static/icons/system/IconChevron';
import { EditorState } from 'lexical';

// TODO: form 관리 어떻게 할까~?
// import { Nullable } from 'types';
// import { ErrorForm } from 'types/form';
// import { useImmer } from 'use-immer';

// interface LostArticleForm {
//   // lostImages: Array<File | undefined>;
//   title: string;
//   content: string;
//   lostType: LostType;
//   desiredLocation: string;
// }

// const INIT_STATE: LostArticleForm = {
//   title: '',
//   content: '',
//   lostType: 'LOST',
//   desiredLocation: '',
// };

// const ERROR_INIT_STATE: ErrorForm<LostArticleForm> = {
//   title: '',
//   content: '',
//   lostType: '',
//   desiredLocation: '',
// };

const LostEditor = () => {
  const handleChangeContent = useCallback((targetValue: EditorState) => {
    let value = targetValue;

    console.log(typeof targetValue);

    console.log('value :', value);
  }, []);

  // let lostInfo: Nullable<LostArticleForm> = null;
  // useEffect(() => {
  //   if (lostInfo) {
  //     setForm((draft) => {
  //       draft.title = lostInfo.title;
  //       draft.content = lostInfo.content;
  //       draft.lostType = lostInfo.lostType;
  //       draft.desiredLocation = lostInfo.desiredLocation;
  //     });
  //   }
  // }, [lostInfo, setForm]);

  return (
    <Layout
      appBar={{
        title: '글 작성',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <div css={section}>
          <span>제목</span>
          <input id="title" name="title" placeholder="제목" />
        </div>
        <div css={section}>
          <span>분실물 타입</span>
          <div css={buttonGroup}>
            <button css={toggleBtn(true)}>유실물</button>
            <button css={toggleBtn(false)}>습득물</button>
          </div>
        </div>
        <div css={section}>
          <span>자세한 설명</span>
          <UiComponent.Editor onChange={handleChangeContent} />
        </div>
        <div css={section}>
          <span>거래 희망 장소</span>
          <div css={inputButtonGroup}>
            <button>위치 추가</button>
            <IconChevron
              css={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '12px',
              }}
            />
          </div>
        </div>
        <div css={section}>
          <span>보상 여부</span>
          <div css={buttonGroup}>
            <button css={toggleBtn(true)}>보상할게요</button>
            <button css={toggleBtn(false)}>보상은 따로 없어요</button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 0 48px 0' }];

const section: [CSSObject, CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

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

const inputButtonGroup: [CSSObject, CSSObject, ({ typography }) => CSSObject] = [
  f.fullHeight,
  f.posRel,
  ({ typography: { fontSize } }: Theme) => ({
    '& > button': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#9da5b6',
      fontSize: fontSize[14],
      width: '100%',
      textAlign: 'left',
    },

    '& > div > svg > path': {
      stroke: '#9da5b6',
    },
  }),
];

const buttonGroup = [f.flexAlignCenter];

const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    border: isActive ? 'none' : '1px solid rgb(196, 212, 252, 0.37)',
    height: '32px',
    borderRadius: '124px',
    padding: '0 14px',
    fontSize: fontSize[14],
    width: 'max-content',
    marginRight: '8px',
    background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
    color: isActive ? '#141517' : '#9da5b6',
    fontWeight: isActive ? fontWeight[600] : fontWeight[400],
  });

export default LostEditor;
