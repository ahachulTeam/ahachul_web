import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, FormComponent } from '@/components';
import { communityTypeFormOptions } from '@/constants';
import { useCommunityForm } from '@/hooks/domain/community';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';

const NewCommunityPage: ActivityComponentType = () => {
  const { isActive } = useActivity();

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useCommunityForm();

  return (
    <LayoutComponent.Base>
      <FormProvider {...methods}>
        <S.FormContainer onSubmit={submit}>
          <FormComponent.ImageUpload
            name="images"
            label="사진 첨부"
            onDeleteImg={handleImageDelete}
            onImgChange={handleImageUpload}
          />
          <FormComponent.Select name="categoryType" options={communityTypeFormOptions} />
          <FormComponent.SubwayLine name="subwayLineId" />
          <FormComponent.Title name="title" />
          <FormComponent.Content name="content" />
          <FormComponent.SubmitButton active={isActive} loading={isPending} onSubmit={submit} />
        </S.FormContainer>
      </FormProvider>
    </LayoutComponent.Base>
  );
};

const S = {
  FormContainer: styled.div`
    ${mixins.fullWidth};
    ${mixins.flexColumn};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
  `,
};

export default NewCommunityPage;
