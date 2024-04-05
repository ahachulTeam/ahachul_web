import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetComplaintDetail } from 'queries/complaints/useGetComplaintDetail';

type ComplaintDetailMainProps = {
  postId: string;
};

const ComplaintDetailMain = ({ postId }: ComplaintDetailMainProps) => {
  const { data } = useGetComplaintDetail(postId);

  return <main>{data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</main>;
};

export default ComplaintDetailMain;
