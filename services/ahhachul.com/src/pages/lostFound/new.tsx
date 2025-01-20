import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, FormComponent } from '@/components';
import { lostFoundTypeOptions } from '@/constants';
import { useLostFoundForm } from '@/hooks/domain';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';

const NewLostFoundPage: ActivityComponentType = () => {
  const { isActive } = useActivity();

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useLostFoundForm();

  return (
    <LayoutComponent.Base>
      <FormProvider {...methods}>
        <S.FormContainer onSubmit={submit}>
          <FormComponent.ImageUpload
            name="images"
            onDeleteImg={handleImageDelete}
            onImgChange={handleImageUpload}
          />
          <FormComponent.Select name="lostType" options={lostFoundTypeOptions} />
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

export default NewLostFoundPage;
