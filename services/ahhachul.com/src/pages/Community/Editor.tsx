import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';
import { EditorState } from 'lexical';
import { ErrorForm } from 'types/form';
import { CommunityCategoryType, ICommunityArticleForm, Nullable } from 'types';
import IconInfo from 'static/icons/system/IconInfo';
import { CommunityQuery } from 'queries';
import { useAppSelector } from 'stores';

const INIT_STATE: ICommunityArticleForm = {
  title: '',
  content: '',
  communityType: 'FREE',
};

const ERROR_INIT_STATE: ErrorForm<ICommunityArticleForm> = {
  title: '',
  content: '',
  communityType: '',
};

const CommunityEditor = () => {
  const formRef = useRef<ICommunityArticleForm>(INIT_STATE);
  const [errors, setError] = useState<ErrorForm<ICommunityArticleForm>>(ERROR_INIT_STATE);

  const { loading } = useAppSelector((state) => state.ui);
  const { mutate, status } = CommunityQuery.useCommunityArticle();

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
    (type: CommunityCategoryType) => () => {
      formRef.current.communityType = type;
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyTitle = formRef.current.title === '';
    const isEmptyContent =
      formRef.current.content === '' || JSON.parse(formRef.current.content)?.root?.children?.[0]?.children?.length <= 0;

    const titleInput = document?.getElementById('title');

    if (isEmptyTitle || isEmptyContent) {
      if (isEmptyTitle && isEmptyContent) {
        titleInput?.focus?.();
        setError((prev) => ({ ...prev, title: '제목을 적어주세요', content: '내용을 적어주세요' }));
      } else {
        if (isEmptyTitle) {
          titleInput?.focus?.();
          setError((prev) => ({ ...prev, title: '제목을 적어주세요' }));
        }
        if (isEmptyContent) {
          const contentInput = document?.getElementById('content');
          contentInput?.focus?.();
          setError((prev) => ({ ...prev, content: '내용을 적어주세요' }));
        }
      }
      return;
    }

    mutate(formRef.current);
  };

  let communityInfo: Nullable<ICommunityArticleForm> = null;
  useEffect(() => {
    if (communityInfo) {
      formRef.current.title = communityInfo.title;
      formRef.current.content = communityInfo.content;
      formRef.current.communityType = communityInfo.communityType;
    } else {
      formRef.current.title = '';
      formRef.current.content = '';
      formRef.current.communityType = 'FREE';
    }
  }, [communityInfo]);

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
              id="title"
              placeholder="제목"
              aria-invalid={!!errors.title}
              onChange={handleChangeTitle}
              onClick={() => {
                if (errors.title) setError((prev) => ({ ...prev, title: '' }));
              }}
            />
            {errors.title && (
              <b>
                <IconInfo /> {errors.title}
              </b>
            )}
          </div>
          <div css={section}>
            <span>카테고리</span>
            <SelectComponent handleChangeLostType={handleChangeLostType} />
          </div>
          <div css={section}>
            <span>자세한 설명</span>
            <UiComponent.Editor
              isRich
              hasError={!!errors.content}
              onChange={handleChangeContent}
              placeholder={
                '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
              }
            />
            {errors.content && (
              <b>
                <IconInfo /> {errors.content}
              </b>
            )}
          </div>
          <div css={submitWrap}>
            <button css={submitBtn} type="submit" disabled={loading || status === 'pending'}>
              작성 완료
            </button>
            {/* <div css={indicatorAreaCss} /> */}
          </div>
        </form>
      </main>
    </Layout>
  );
};

const SelectComponent = memo(
  ({ handleChangeLostType }: { handleChangeLostType: (type: CommunityCategoryType) => () => void }) => {
    const [currentLostType, setCurrentLostType] = useState('FREE');

    const handleToggle = (type: CommunityCategoryType) => () => {
      setCurrentLostType(type);
      handleChangeLostType(type)();
    };

    return (
      <div css={buttonGroup}>
        <button type="button" css={toggleBtn(currentLostType === 'FREE')} onClick={handleToggle('FREE')}>
          자유
        </button>
        <button type="button" css={toggleBtn(currentLostType === 'INSIGHT')} onClick={handleToggle('INSIGHT')}>
          정보
        </button>
        <button type="button" css={toggleBtn(currentLostType === 'ISSUE')} onClick={handleToggle('ISSUE')}>
          질문
        </button>
      </div>
    );
  },
);

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 0 120px 0' }];

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

    '& > b': {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#E02020',
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
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
    padding: '16px 20px 24px',
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

// const indicatorAreaCss = {
//   height: '34px',
//   width: '100%',
// };

export default CommunityEditor;
