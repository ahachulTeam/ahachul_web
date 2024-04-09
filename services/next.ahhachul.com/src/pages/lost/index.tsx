import { LostComponent, UiComponent } from '@/src/components';

export default function Lost() {
  return (
    <section>
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </section>
  );
}
