import React, { CSSProperties, FormEvent, memo, useCallback, useRef, useState } from 'react';
// import { ActivityComponentType } from '@stackflow/react';
// import { Layout } from '@/src/components/layout';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from '@/src/data/complaints';
import { exportHexColorWidthLineName, exportSubwayInfoFromTrainNumber } from '@/src/utils/export';
import { CSSObject, Theme } from '@emotion/react';
import { f } from '@/src/styles';
import { useComplaintsArticle } from '@/src/queries/complaints';
import { UiComponent } from '@/src/components';
import { EditorState } from 'lexical';
import { IComplaintForm } from '@/src/types/complaints';
import { useAppSelector } from '@/src/stores';
import { addSnackBar } from '@/src/stores/ui';
import { useDispatch } from 'react-redux';

type ComplaintsSubmissionProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
  trainNumber: string;
};

const INIT_STATE: IComplaintForm = {
  trainNo: '',
  content: '',
  complaintType: '',
  shortContent: '',
};

const ComplaintsSubmission: React.FC<ComplaintsSubmissionProps> = (params) => {
  const trainNo = params.trainNumber;
  const trainInfo = exportSubwayInfoFromTrainNumber(trainNo);

  const dispatch = useDispatch();

  const formRef = useRef<IComplaintForm>(INIT_STATE);
  const { mutate } = useComplaintsArticle();
  const { loading } = useAppSelector((state) => state.ui);

  const handleChangeContent = useCallback((targetValue: EditorState) => {
    formRef.current.content = JSON.stringify(targetValue.toJSON());
  }, []);

  const handleChangeSelect = useCallback(
    (type: string) => () => {
      formRef.current.shortContent = type;
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current.shortContent) {
      dispatch(addSnackBar({ message: `민원 유형을 선택해주세요.` }));
      return;
    }

    console.log({
      ...formRef.current,
      trainNo,
      complaintType: params.slug,
    });

    mutate({
      ...formRef.current,
      trainNo,
      complaintType: params.slug,
    });
  };

  return (
    // <Layout activeTab={false} appBar={{ title: params.slug }}>

    <main css={wrap}>
      <form onSubmit={handleSubmit}>
        <div css={section}>
          <span>지하철 정보</span>
          <div css={trainLabelsWrap(exportHexColorWidthLineName(trainInfo.lineName || ''))}>
            <span>
              {trainInfo?.lineName} {trainInfo.roomNumber && `${trainInfo.roomNumber}번째 칸`}
            </span>
          </div>
        </div>
        <div css={section}>
          <span>{COMPLAINTS_ROOM_SERVICE_INFO[params.slug].title}</span>
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
    // </Layout>
  );
};

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

    '& > span': {
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

export default ComplaintsSubmission;