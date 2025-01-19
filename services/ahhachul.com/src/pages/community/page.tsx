import { HeaderComponent, LayoutComponent } from '@/components';

const CommunityPage = () => {
  return (
    <LayoutComponent.Composed
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
      outerChildren={<></>}
    >
      CommunityPage
    </LayoutComponent.Composed>
  );
};

export default CommunityPage;
