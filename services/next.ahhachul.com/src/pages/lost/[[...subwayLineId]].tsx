import { Layout } from '@/src/components/layout';
import { LostComponent, UiComponent } from '@/src/components';

export default function Lost() {
  return (
    <Layout headerType="search">
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}
