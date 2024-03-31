import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';
import IconChevron from 'static/icons/system/IconChevron';
import { EditorState } from 'lexical';

// TODO: form 관리 어떻게 할까~?
import { LostType, Nullable } from 'types';
import { ErrorForm } from 'types/form';
import IconInfo from 'static/icons/system/IconInfo';

interface LostArticleForm {
  // lostImages: Array<File | undefined>;
  title: string;
  content: string;
  lostType: LostType;
  desiredLocation?: string;
}

const INIT_STATE: LostArticleForm = {
  title: '',
  content: '',
  lostType: 'LOST',
  desiredLocation: '',
};

const ERROR_INIT_STATE: ErrorForm<LostArticleForm> = {
  title: '',
  content: '',
  lostType: '',
  desiredLocation: '',
};

const LostEditor = () => {
  const formRef = useRef<LostArticleForm>(INIT_STATE);
  const [errors, setError] = useState<ErrorForm<LostArticleForm>>(ERROR_INIT_STATE);

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (errors.title) setError((prev) => ({ ...prev, title: '' }));
      formRef.current.title = e.target.value;
    },
    [errors],
  );
  const handleChangeContent = useCallback(
    (targetValue: EditorState) => {
      if (errors.content) setError((prev) => ({ ...prev, content: '' }));
      formRef.current.content = JSON.stringify(targetValue.toJSON());
    },
    [errors],
  );

  const handleChangeLostType = useCallback(
    (type: LostType) => () => {
      formRef.current.lostType = type;
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyContent = JSON.parse(formRef.current.content)?.root?.children?.[0]?.children?.length <= 0;
    console.log('isEmptyContent:', isEmptyContent);

    if (!formRef.current.title && isEmptyContent) {
      setError((prev) => ({ ...prev, title: '제목을 적어주세요', content: '내용을 적어주세요' }));
      return;
    } else {
      if (!formRef.current.title) setError((prev) => ({ ...prev, title: '제목을 적어주세요' }));
      if (isEmptyContent) setError((prev) => ({ ...prev, content: '내용을 적어주세요' }));

      console.log('submit form values :', formRef.current);
    }
  };

  let lostInfo: Nullable<LostArticleForm> = null;
  useEffect(() => {
    if (lostInfo) {
      formRef.current.title = lostInfo.title;
      formRef.current.content = lostInfo.content;
      formRef.current.lostType = lostInfo.lostType;
      // formRef.current.desiredLocation = lostInfo.desiredLocation;
    }
  }, [lostInfo]);

  return (
    <Layout
      appBar={{
        title: '글 작성',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <form onSubmit={handleSubmit}>
          <div css={section}>
            <span>제목</span>
            <input
              placeholder="제목"
              aria-invalid={!!errors.title}
              onChange={handleChangeTitle}
              onClick={() => {
                if (errors.title) setError((prev) => ({ ...prev, title: '' }));
              }}
            />
            {errors.title && (
              <p>
                <IconInfo /> {errors.title}
              </p>
            )}
          </div>
          <div css={section}>
            <span>분실물 타입</span>
            <SelectComponent handleChangeLostType={handleChangeLostType} />
          </div>
          <div css={section}>
            <span>자세한 설명</span>
            <UiComponent.Editor hasError={!!errors.content} onChange={handleChangeContent} />
            {errors.content && (
              <p>
                <IconInfo /> {errors.content}
              </p>
            )}
          </div>
          <div css={section}>
            <span>거래 희망 장소</span>
            <div css={inputButtonGroup}>
              <button type="button">위치 추가</button>
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
          <div css={submitWrap}>
            <button css={submitBtn} type="submit">
              작성 완료
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

const SelectComponent = memo(({ handleChangeLostType }: { handleChangeLostType: (type: LostType) => () => void }) => {
  const [currentLostType, setCurrentLostType] = useState('LOST');

  const handleToggle = (type: LostType) => () => {
    setCurrentLostType(type);
    handleChangeLostType(type)();
  };

  return (
    <div css={buttonGroup}>
      <button type="button" css={toggleBtn(currentLostType === 'LOST')} onClick={handleToggle('LOST')}>
        유실물
      </button>
      <button type="button" css={toggleBtn(currentLostType === 'ACQUIRE')} onClick={handleToggle('ACQUIRE')}>
        습득물
      </button>
    </div>
  );
});

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 0 80px 0' }];

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
      color: '#ffffff',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },

      '&[aria-invalid="true"]': {
        borderColor: '#E02020',
      },
    },

    '& > p': {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#E02020',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginTop: '12px',
      gap: '6px',

      '& > div > svg > path': {
        fill: '#E02020',
        stroke: '#ffffff',

        '&:first-of-type': {
          stroke: '#E02020',
        },
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

const submitWrap: CSSObject[] = [
  f.fullWidth,
  {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#141517',
    padding: '16px 20px',
  },
];

const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  height: '48px',
  background: 'rgb(196, 212, 252)',
  color: '#141517',
  fontWeight: fontWeight[600],
  borderRadius: '8px',
});

export default LostEditor;
