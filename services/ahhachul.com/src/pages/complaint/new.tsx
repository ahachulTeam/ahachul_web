import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, FormComponent } from '@/components';
import { complaintsContentDetail } from '@/constants';
import useComplaintForm from '@/hooks/domain/complaint/useComplaintForm';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';
import { KeyOf } from '@/types';

interface ComplaintFormProps {
  slug: KeyOf<typeof complaintsContentDetail>;
}

const NewComplaintPage: ActivityComponentType<ComplaintFormProps> = ({
  params: { slug },
}: {
  params: {
    slug: KeyOf<typeof complaintsContentDetail>;
  };
}) => {
  const information = complaintsContentDetail[slug];

  const { isActive } = useActivity();

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } =
    useComplaintForm(slug);

  return (
    <LayoutComponent.Base>
      <FormProvider {...methods}>
        <S.FormContainer onSubmit={submit}>
          <FormComponent.ImageUpload
            name="images"
            label="유실물 상세정보"
            onDeleteImg={handleImageDelete}
            onImgChange={handleImageUpload}
          />
          <FormComponent.Select
            name="lostType"
            label={information.title}
            options={information.selectList}
            rules={{
              required: '유형을 선택해주세요',
            }}
          />
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

export default NewComplaintPage;
