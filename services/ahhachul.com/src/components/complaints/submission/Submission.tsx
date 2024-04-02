import React, { CSSProperties } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'components/layout';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import loadable from '@loadable/component';
import { exportHexColorWidthLineName, exportSubwayInfoFromTrainNumber } from 'utils/export';
import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';
import { useComplaintsArticle } from 'queries/complaints';

type ComplaintsSubmissionProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
  trainNumber: string;
};

const AsyncRoomService = loadable(
  (props: { page: COMPLAINTS_CONTENTS_TYPES }) => import(`../room/services/${props.page}`),
  {
    cacheKey: (props) => props.page,
  },
);

const ComplaintsSubmission: ActivityComponentType<ComplaintsSubmissionProps> = ({ params }) => {
  const { mutate } = useComplaintsArticle();
  const trainNo = params.trainNumber;
  const trainInfo = exportSubwayInfoFromTrainNumber(trainNo);

  const handleSubmit = () => {
    mutate({
      trainNo,
      subwayLineId: '',
      content: '',
      complaintType: params.slug,
      shortContent: '',
    });
  };

  return (
    <Layout activeTab={false} appBar={{ title: params.slug }}>
      <main css={wrap}>
        <div css={trainLabelsWrap(exportHexColorWidthLineName(trainInfo.lineName))}>
          <span>
            {trainInfo.lineName} / {trainNo} / {trainInfo.roomNumber}번째 칸
          </span>
        </div>
        <AsyncRoomService page={params.slug} />
        <div css={submitWrap}>
          <button css={submitBtn} onClick={handleSubmit}>
            민원접수
          </button>
        </div>
      </main>
    </Layout>
  );
};

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 0 120px 0' }];

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
    padding: '0 20px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      padding: '0 12px',
      height: '32px',
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
