import React, { CSSProperties, FormEvent, memo, useCallback, useRef, useState } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'components/layout';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';
import {
  exportHexColorWidthLineName,
  exportSubwayInfoFromTrainNumber,
  exportSubwayLineIdWithLineName,
  formatComplaintShortContentToEn,
  formatComplaintTypeToEn,
} from 'utils/export';
import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';
import { useComplaintsArticle } from 'queries/complaints';
import { UiComponent } from 'components';
import { EditorState } from 'lexical';
import { IComplaintForm } from 'types/complaints';
import { useAppSelector } from 'stores';
import { addSnackBar } from 'stores/ui';
import { useDispatch } from 'react-redux';
import IconCamera from 'static/icons/system/IconCamera';
import IconCircleClose from 'static/icons/system/IconCircleClose';

type ComplaintsSubmissionProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
  trainNumber: string;
};

const INIT_STATE: IComplaintForm = {
  trainNo: '',
  location: '',
  subwayLineId: '',
  content: '',
  complaintType: '',
  shortContentType: '',
  imageFiles: null,
};

const ComplaintsSubmission: ActivityComponentType<ComplaintsSubmissionProps> = ({ params }) => {
  const trainNo = params.trainNumber;
  const trainInfo = exportSubwayInfoFromTrainNumber(trainNo);

  const dispatch = useDispatch();

  const formRef = useRef<IComplaintForm>(INIT_STATE);
  const { mutate } = useComplaintsArticle();
  const { loading } = useAppSelector((state) => state.ui);

  const handleChangeImage = useCallback((image: File | null) => {
    formRef.current.imageFiles = image;
  }, []);

  const handleChangeContent = useCallback((targetValue: EditorState) => {
    formRef.current.content = JSON.stringify(targetValue.toJSON());
  }, []);

  const handleChangeSelect = useCallback(
    (type: string) => () => {
      formRef.current.shortContentType = formatComplaintShortContentToEn(type);
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current.shortContentType) {
      dispatch(addSnackBar({ message: `민원 유형을 선택해주세요.` }));
      return;
    }

    mutate({
      ...formRef.current,
      trainNo,
      subwayLineId: exportSubwayLineIdWithLineName(trainInfo.lineName),
      complaintType: formatComplaintTypeToEn(params.slug),
      location: trainInfo.roomNumber,
      phoneNumber: '02-234-5678',
    });
  };

  return (
    <Layout activeTab={false} appBar={{ title: params.slug }}>
      <main css={wrap}>
        <form onSubmit={handleSubmit}>
          <div css={section}>
            <span>지하철 정보</span>
            <div css={trainLabelsWrap(exportHexColorWidthLineName(trainInfo.lineName))}>
              <span>
                {trainInfo?.lineName} {trainInfo.roomNumber && `${trainInfo.roomNumber}번째 칸`}
              </span>
            </div>
          </div>
          <div css={section}>
            <span>첨부 이미지</span>
            <ImageUpload handleChangeImage={handleChangeImage} />
          </div>
          <div css={section}>
            <p>
              {COMPLAINTS_ROOM_SERVICE_INFO[params?.slug]?.title}
              <span css={{ fontSize: 16, color: 'red', marginLeft: 2 }}>*</span>
            </p>
            <SelectComponent
              selectList={COMPLAINTS_ROOM_SERVICE_INFO[params.slug].selectList}
              handleChangeSelect={handleChangeSelect}
            />
          </div>
          <div css={section}>
            <span>자세한 설명</span>
            <UiComponent.Editor
              onChange={handleChangeContent}
              placeholder={
                '민원 내용을 입력해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 삭제 처리 될 수 있습니다.'
              }
            />
          </div>
          <div css={submitWrap}>
            <button type="submit" css={submitBtn} disabled={loading.active || status === 'pending'}>
              민원접수
            </button>
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

const SelectComponent = memo(
  ({
    selectList,
    handleChangeSelect,
  }: {
    selectList: Record<string, string>;
    handleChangeSelect: (type: string) => () => void;
  }) => {
    const [current, setCurrent] = useState('');

    const handleToggle = (type: string) => () => {
      setCurrent(type);
      handleChangeSelect(type)();

      const element = document.getElementById(type);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    return (
      <div css={buttonGroup}>
        {Object.entries(selectList).map(([key, val]) => (
          <button key={key} id={key} type="button" css={toggleBtn(current === key)} onClick={handleToggle(key)}>
            {val}
          </button>
        ))}
      </div>
    );
  },
);

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 0 120px 0' }];

const section: [CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span, & > p': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
      paddingLeft: '20px',
    },

    '& > div.editor-container': {
      width: 'calc(100% - 40px)',
      margin: '0 auto',
    },
  }),
];

const buttonGroup: [CSSObject[], CSSObject, CSSObject] = [
  f.flexAlignCenter,
  f.overflowScroll,
  {
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
];

const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    flexShrink: 0,
    border: '1px solid rgb(196, 212, 252, 0.37)',
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

const trainLabelsWrap =
  (pointColor: CSSProperties['color']) =>
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '20px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      padding: '0 12px',
      height: '30px',
      color: gray[1000],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      background: pointColor,
    },
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
    paddingLeft: '20px',

    '& > label': {
      width: '40px',
      height: '40px',
      border: '1px solid rgb(196, 212, 252, 0.37)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.4 : 1,

      '& > div': {
        width: '18px',
        height: '18px',

        '&>svg>path': {
          stroke: '#9da5b6',
        },
      },
    },
  },
];

const realImage: CSSObject = {
  position: 'relative',
  width: '39px',
  height: '39px',
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

export default ComplaintsSubmission;
