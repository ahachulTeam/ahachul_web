import { FormProvider } from 'react-hook-form';

import { FormComponent } from '@/components';
import { lostFoundTypeOptions } from '@/constants';
import { useEditCommunityForm } from '@/hooks/domain/community';
import { useFetchCommunityDetail } from '@/services/community';
import { useActivity } from '@/stackflow';
import type { WithPostId } from '@/types';

import * as S from './EditCommunity.styled';

const EditCommunity = ({ id }: WithPostId) => {
  const { isActive } = useActivity();

  const { data: post } = useFetchCommunityDetail(id);

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useEditCommunityForm(
    id,
    post.categoryType,
    {
      title: post.title,
      content: post.content,
      categoryType: post.categoryType,
      subwayLineId: post.subwayLineId,
      removeFileIds: [],
      images:
        post.images.map(image => ({
          data: null,
          url: image.imageUrl,
          id: image.imageId ?? null,
        })) ?? [],
    },
  );

  return (
    <FormProvider {...methods}>
      <S.FormContainer onSubmit={submit}>
        <FormComponent.ImageUpload
          name="images"
          label="사진 첨부"
          onDeleteImg={handleImageDelete}
          onImgChange={handleImageUpload}
        />
        <FormComponent.Select name="categoryType" options={lostFoundTypeOptions} />
        <FormComponent.SubwayLine name="subwayLineId" />
        <FormComponent.Title name="title" />
        <FormComponent.Content name="content" initialState={post.content} />
        <FormComponent.SubmitButton active={isActive} loading={isPending} onSubmit={submit} />
      </S.FormContainer>
    </FormProvider>
  );
};

export default EditCommunity;
