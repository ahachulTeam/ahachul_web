import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import * as styles from './Page.css';

const CreateCommunityArticle: ActivityComponentType = () => {
  return (
    <Layout appBar={{ title: '커뮤니티 글 작성' }}>
      <div css={[styles.layout, { color: 'white' }]}>커뮤니티 글 작성</div>
    </Layout>
  );
};

export default CreateCommunityArticle;
