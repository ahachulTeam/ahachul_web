import { Layout } from '@/src/components/layout';
import withAuth from '@/src/hooks/withAuth';

function ChatRoom() {
  return <Layout headerType="back" title="선바" nav={false}></Layout>;
}

export default withAuth(ChatRoom);
