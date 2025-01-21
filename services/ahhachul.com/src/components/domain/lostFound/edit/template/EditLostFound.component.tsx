import { FormProvider } from 'react-hook-form';

import { FormComponent } from '@/components';
import { lostFoundTypeOptions } from '@/constants';
import { useEditLostFoundForm } from '@/hooks/domain';
import { useFetchLostFoundDetail } from '@/services/lostFound';
import { useActivity } from '@/stackflow';
import type { WithPostId } from '@/types';

import * as S from './EditLostFound.styled';

const EditLostFound = ({ id }: WithPostId) => {
  const { isActive } = useActivity();

  const { data: post } = useFetchLostFoundDetail(id);

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useEditLostFoundForm(
    id,
    post.lostType,
    {
      title: post.title,
      content: post.content,
      lostType: post.lostType,
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
<<<<<<< HEAD
          label="유실물 상세정보"
=======
>>>>>>> main
          onDeleteImg={handleImageDelete}
          onImgChange={handleImageUpload}
        />
        <FormComponent.Select name="lostType" options={lostFoundTypeOptions} />
        <FormComponent.SubwayLine name="subwayLineId" />
        <FormComponent.Title name="title" />
        <FormComponent.Content name="content" initialState={post.content} />
        <FormComponent.SubmitButton active={isActive} loading={isPending} onSubmit={submit} />
      </S.FormContainer>
    </FormProvider>
  );
};

export default EditLostFound;
