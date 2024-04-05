import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetLostDetail } from 'queries/lost/useGetLostDetail';

type ComplaintDetailMainProps = {
  postId: string;
};

const ComplaintDetailMain = ({ postId }: ComplaintDetailMainProps) => {
  const { data } = useGetLostDetail(postId);

  return <main>{data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</main>;
};

export default ComplaintDetailMain;
