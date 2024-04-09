import { CommunityComponent, UiComponent } from '@/src/components';

export default function Community() {
  return (
    <section>
      <CommunityComponent.CommunityMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </section>
  );
}
