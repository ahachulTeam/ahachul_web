import { LostComponent, UiComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';

export default function Lost() {
  return (
    <Layout>
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}
