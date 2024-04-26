import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { EditorState } from 'lexical';
import { CSSObject, Theme } from '@emotion/react';

import { ErrorForm } from '@/src/types/form';
import { CommunityCategoryType, ICommunityArticleForm, Nullable } from '@/src/types';
import IconInfo from '@/src/static/icons/system/IconInfo';
import { CommunityQuery } from '@/src/queries';
import { useAppSelector } from '@/src/stores';
import { Layout } from '@/src/components/layout';
import { UiComponent } from '@/src/components';
import { f } from '@/src/styles';
import IconCamera from '@/src/static/icons/system/IconCamera';
import IconCircleClose from '@/src/static/icons/system/IconCircleClose';
import { exportLineNameWithSubwayLineId } from '@/src/utils/export';
import IconChevron from '@/src/static/icons/system/IconChevron';

const INIT_STATE: ICommunityArticleForm = {
  title: '',
  content: '',
  subwayLineId: '',
  categoryType: 'FREE',
  imageFiles: null,
};

const ERROR_INIT_STATE: ErrorForm<ICommunityArticleForm> = {
  title: '',
  content: '',
  subwayLineId: '',
  categoryType: '',
  imageFiles: '',
};

export default function CommunityEditor() {
  const formRef = useRef<ICommunityArticleForm>(INIT_STATE);
  const [errors, setError] = useState<ErrorForm<ICommunityArticleForm>>(ERROR_INIT_STATE);

  const { loading } = useAppSelector((state) => state.ui);
  const { mutate, status } = CommunityQuery.useCommunityArticle();

  const handleChangeImage = useCallback((image: File | null) => {
    formRef.current.imageFiles = image;
  }, []);

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
      formRef.current.categoryType = type;
    },
    [],
  );

  const handleSubwayLine = useCallback((subwayLine: Nullable<string>) => {
    if (!subwayLine) {
      formRef.current.subwayLineId = '';
    } else {
      formRef.current.subwayLineId = subwayLine;
    }
  }, []);

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
      formRef.current.subwayLineId = communityInfo.subwayLineId;
      formRef.current.categoryType = communityInfo.categoryType;
    }
  }, [communityInfo]);

  return (
    <Layout headerType="back" title="글 작성" nav={false}>
      <form css={wrap} onSubmit={handleSubmit}>
        <div css={section}>
          <ImageUpload handleChangeImage={handleChangeImage} />
        </div>
        <div css={section}>
          <p>
            제목
            <span css={{ fontSize: 16, color: 'red', marginLeft: 2 }}>*</span>
          </p>
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
          <p>
            카테고리
            <span css={{ fontSize: 16, color: 'red', marginLeft: 2 }}>*</span>
          </p>
          <SelectComponent handleChangeLostType={handleChangeLostType} />
        </div>
        <div css={section}>
          <p>
            자세한 설명
            <span css={{ fontSize: 16, color: 'red', marginLeft: 2 }}>*</span>
          </p>
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
        <div css={section}>
          <span>어떤 호선에 글을 작성할까요?</span>
          <SelectSubwayComponent handleSubwayLine={handleSubwayLine} />
        </div>
        <div css={submitWrap}>
          <button css={submitBtn} type="submit" disabled={loading.active || status === 'pending'}>
            작성 완료
          </button>
          {/* <div css={indicatorAreaCss} /> */}
        </div>
      </form>
    </Layout>
  );
}

const ImageUpload = memo(({ handleChangeImage }: { handleChangeImage: (image: File | null) => void }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] as Nullable<File>);
    handleChangeImage(e.target.files?.[0] as Nullable<File>);
  };

  const handleDeleteImage = () => {
    setImage(null);
    handleChangeImage(null);
  };

  return (
    <div css={imageBox(Boolean(image))}>
      <label htmlFor="upload">
        <IconCamera />
        <input
          id="upload"
          type="file"
          accept="image/*"
          hidden
          disabled={Boolean(image)}
          onChange={(e) => {
            if (e.target.files?.[0]?.size === 0) return;
            handleImageChange(e);
          }}
        />
      </label>

      {image && (
        <div css={realImage}>
          <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="" />
          <IconCircleClose onClick={handleDeleteImage} />
        </div>
      )}
    </div>
  );
});

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

const SelectSubwayComponent = memo(
  ({ handleSubwayLine }: { handleSubwayLine: (subwayLine: Nullable<string>) => void }) => {
    const [show, toggle] = useReducer((c) => !c, false);
    const [subwayLineId, setSubwayLineId] = useState<string | undefined>();

    const handleSubway = (subwayLine: Nullable<string>) => {
      if (!subwayLine) {
        setSubwayLineId(undefined);
      } else {
        setSubwayLineId(subwayLine);
      }
      handleSubwayLine(subwayLine);
    };

    return (
      <div css={inputButtonGroup}>
        <button type="button" onClick={toggle}>
          {subwayLineId ? exportLineNameWithSubwayLineId(subwayLineId) : '호선 추가'}
        </button>
        <IconChevron
          css={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '12px',
          }}
        />
        <UiComponent.SubwayLineBottomSheet
          isShowing={show}
          subwayLineId={subwayLineId}
          onClose={toggle}
          handleSubwayLine={handleSubway}
        />
      </div>
    );
  },
);

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 0 120px 0' }];

const section: [CSSObject, CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span, & > p': {
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

const inputButtonGroup: [CSSObject, CSSObject, ({ typography }: Theme) => CSSObject] = [
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

const imageBox = (disabled: boolean) => [
  f.flexAlignCenter,
  f.fullWidth,
  {
    '& > label': {
      width: '56px',
      height: '56px',
      border: '1px solid rgb(196, 212, 252, 0.37)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.4 : 1,

      '& > div': {
        width: '20px',
        height: '20px',

        '&>svg>path': {
          stroke: '#9da5b6',
        },
      },
    },
  },
];

const realImage: CSSObject = {
  position: 'relative',
  width: '55px',
  height: '55px',
  borderRadius: '8px',
  marginLeft: '8px',

  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  '& > div': {
    position: 'absolute',
    top: '2px',
    right: '2px',

    width: '18px',
    height: '18px',
  },
};
