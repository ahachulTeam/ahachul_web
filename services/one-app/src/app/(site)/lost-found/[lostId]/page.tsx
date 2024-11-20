import { apiClient } from '@/app/api';
import LostFoundForm from './_component/LostFoundForm';
import { LostFound } from '@/model/LostFound';

type Params = {
  params: {
    lostId: string | number;
  };
};

const Page = async ({ params }: Params) => {
  const { lostId } = params;
  let lostFoundData: LostFound | null = null;

  if (Number(lostId)) {
    try {
      const res = await apiClient.get(`/lost-posts/${lostId}`);
      lostFoundData = res.data.result;
    } catch (e) {
      return <h1>Error!</h1>;
    }
  }

  return (
    <main>
      <LostFoundForm lostFoundData={lostFoundData} />
    </main>
  );
};

export default Page;
