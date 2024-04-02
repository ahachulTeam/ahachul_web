import React, { CSSProperties, FormEvent, useCallback, useRef } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'components/layout';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { exportHexColorWidthLineName, exportSubwayInfoFromTrainNumber } from 'utils/export';
import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';
import { useComplaintsArticle } from 'queries/complaints';
import { UiComponent } from 'components';
import { EditorState } from 'lexical';
import { IComplaintForm } from 'types/complaints';
import { useAppSelector } from 'stores';

type ComplaintsSubmissionProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
  trainNumber: string;
};

const INIT_STATE: IComplaintForm = {
  trainNo: '',
  subwayLineId: '',
  content: '',
  complaintType: '',
  shortContent: '',
};

const ComplaintsSubmission: ActivityComponentType<ComplaintsSubmissionProps> = ({ params }) => {
  const trainNo = params.trainNumber;
  const trainInfo = exportSubwayInfoFromTrainNumber(trainNo);

  const formRef = useRef<IComplaintForm>(INIT_STATE);
  const { mutate } = useComplaintsArticle();
  const { loading } = useAppSelector((state) => state.ui);

  const handleChangeContent = useCallback((targetValue: EditorState) => {
    formRef.current.content = JSON.stringify(targetValue.toJSON());
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      ...formRef.current,
      trainNo,
      subwayLineId: '',
      shortContent: '',
      complaintType: params.slug,
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
                {trainNo} / {trainInfo.lineName} / {trainInfo.roomNumber}번째 칸
              </span>
            </div>
          </div>
          <div css={section}>
            <span>자세한 설명</span>
            <UiComponent.Editor onChange={handleChangeContent} />
          </div>
          <div css={submitWrap}>
            <button type="submit" css={submitBtn} disabled={loading || status === 'pending'}>
              민원접수
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

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
    },
  }),
];

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
