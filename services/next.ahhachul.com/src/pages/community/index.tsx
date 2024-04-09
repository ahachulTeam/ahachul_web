import { CommunityComponent, UiComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';

export default function Community() {
  return (
    <Layout headerType="search">
      <CommunityComponent.CommunityMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}
