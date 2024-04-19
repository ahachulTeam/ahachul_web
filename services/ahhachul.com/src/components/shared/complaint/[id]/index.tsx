import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetComplaintDetail } from 'queries/complaints/useGetComplaintDetail';
import FloatBtn from './FloatBtn';

type ComplaintDetailMainProps = {
  postId: string;
};

const ComplaintDetailMain = ({ postId }: ComplaintDetailMainProps) => {
  const { data } = useGetComplaintDetail(postId);

  return (
    <main>
      {data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}
      {/* TODO: 내가 작성한 글일때만 보이게  */}
      <FloatBtn
        trainNo={data.trainNo}
        subwayLineId={data.subwayLineId}
        complaintType={data.complaintType}
        shortContent={data.shortContent}
        id={data.id}
      />
      {/* TODO: 내가 작성한 글일때만 보이게  */}
    </main>
  );
};

export default ComplaintDetailMain;
