import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, FormComponent } from '@/components';
import { lostFoundTypeOptions } from '@/constants';
import { useLostFoundForm } from '@/hooks/domain';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';

const NewLostFoundPage: ActivityComponentType = () => {
  const { isActive } = useActivity();

  const { control, isPending, isDisabled, register, submit } = useLostFoundForm();

  return (
    <LayoutComponent.Base>
      <S.FormContainer onSubmit={submit}>
        <FormComponent.ImageUpload name="images" control={control} />
        <FormComponent.Select name="lostType" control={control} options={lostFoundTypeOptions} />
        <FormComponent.SubwayLine name="subwayLineId" control={control} />
        <FormComponent.Title name="title" control={control} register={register} />
        <FormComponent.Content name="content" control={control} />
        <FormComponent.SubmitButton
          active={isActive}
          loading={isPending}
          disabled={isDisabled}
          onSubmit={submit}
        />
      </S.FormContainer>
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
