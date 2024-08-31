import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetLostDetail } from '@/src/queries/lost/useGetLostDetail';

type LostDetailMainProps = {
  postId: string;
};

const LostDetailMain = ({ postId }: LostDetailMainProps) => {
  const { data } = useGetLostDetail(postId);

  return <article>{data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</article>;
};

export default LostDetailMain;
