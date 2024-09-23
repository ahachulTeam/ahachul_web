import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import * as styles from './Page.css';

const CreateLostArticle: ActivityComponentType = () => {
  return (
    <Layout appBar={{ title: '분실물 글 작성' }}>
      <div css={[styles.layout(), { color: 'white' }]}>분실물 글 작성</div>
    </Layout>
  );
};

export default CreateLostArticle;
