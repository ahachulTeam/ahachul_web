import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';
import IconChevron from 'static/icons/system/IconChevron';
import { EditorState } from 'lexical';

import { ILostArticleForm, LostType, Nullable } from 'types';
import { ErrorForm } from 'types/form';
import IconInfo from 'static/icons/system/IconInfo';
import { LostQuery } from 'queries';
import { useAppSelector } from 'stores';
import IconCamera from 'static/icons/system/IconCamera';
import IconCircleClose from 'static/icons/system/IconCircleClose';

const INIT_STATE: ILostArticleForm = {
  title: '',
  content: '',
  lostType: 'ACQUIRE',
  desiredLocation: '',
  imageFiles: null,
};

const ERROR_INIT_STATE: ErrorForm<ILostArticleForm> = {
  title: '',
  content: '',
  lostType: '',
  desiredLocation: '',
  imageFiles: '',
};

const LostEditor = () => {
  const formRef = useRef<ILostArticleForm>(INIT_STATE);
  const [errors, setError] = useState<ErrorForm<ILostArticleForm>>(ERROR_INIT_STATE);

  const { loading } = useAppSelector((state) => state.ui);
  const { status } = LostQuery.useLostArticle();

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
    (type: LostType) => () => {
      formRef.current.lostType = type;
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
    console.log('formRef.current:', formRef.current);
    // mutate(formRef.current);
  };

  let lostInfo: Nullable<ILostArticleForm> = null;
  useEffect(() => {
    if (lostInfo) {
      formRef.current.title = lostInfo.title;
      formRef.current.content = lostInfo.content;
      formRef.current.lostType = lostInfo.lostType;
      formRef.current.desiredLocation = lostInfo.desiredLocation;
    } else {
      formRef.current.title = '';
      formRef.current.content = '';
      formRef.current.lostType = 'LOST';
      formRef.current.desiredLocation = '';
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
            <ImageUpload handleChangeImage={handleChangeImage} />
          </div>
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
            <span>유실물 타입</span>
            <SelectComponent handleChangeLostType={handleChangeLostType} />
          </div>
          <div css={section}>
            <span>자세한 설명</span>
            <UiComponent.Editor
              hasError={!!errors.content}
              onChange={handleChangeContent}
              placeholder={
                '게시글 내용을 작성해 주세요.\n\n보상이나 사례가 포함된경우\n#보상 혹은 #사례\n해시태그를 입력해주세요.'
              }
            />
            {errors.content && (
              <b>
                <IconInfo /> {errors.content}
              </b>
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
            <button css={submitBtn} type="submit" disabled={loading.active || status === 'pending'}>
              작성 완료
            </button>
            {/* <div css={indicatorAreaCss} /> */}
          </div>
        </form>
      </main>
    </Layout>
  );
};

const ImageUpload = memo(({ handleChangeImage }: { handleChangeImage: (image: File | null) => void }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files[0]);
    handleChangeImage(e.target.files[0]);
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
            if (e.target.files[0].size === 0) return;
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

const SelectComponent = memo(({ handleChangeLostType }: { handleChangeLostType: (type: LostType) => () => void }) => {
  const [currentLostType, setCurrentLostType] = useState('ACQUIRE');

  const handleToggle = (type: LostType) => () => {
    setCurrentLostType(type);
    handleChangeLostType(type)();
  };

  return (
    <div css={buttonGroup}>
      <button type="button" css={toggleBtn(currentLostType === 'ACQUIRE')} onClick={handleToggle('ACQUIRE')}>
        습득물
      </button>
      <button type="button" css={toggleBtn(currentLostType === 'LOST')} onClick={handleToggle('LOST')}>
        분실물
      </button>
    </div>
  );
});

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 0 120px 0' }];

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

export default LostEditor;
