import React, { useMemo, useCallback } from 'react';
import { ActivityComponentType, useActivity } from '@stackflow/react';
import { Layout } from 'widgets';
import type { LostForm } from 'pages/lost-found/model/form';
import { useCreateLostArticleForm } from 'pages/lost-found/lib/useCreateLostArticleForm';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { TitleField } from 'widgets/form-fields/ui/TitleField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import * as styles from './Create.css';
import SubwaySelectField from 'widgets/form-fields/ui/SubwaySelectField';

const SUBMIT_BUTTON_TEXT = '등록';
const LOST_AND_FOUND_CATEGORY_LIST = {
  LOST: '분실물',
  ACQUIRE: '습득물',
};

const CreateLostArticle: ActivityComponentType = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    onSubmit,
    onError,
  } = useCreateLostArticleForm();
  const submit = handleSubmit(onSubmit, onError);

  const activity = useActivity();
  const renderForm = useCallback(
    () => (
      <form css={styles.wrap} onSubmit={submit}>
        <ImageUploadField<LostForm> control={control} name="imageFiles" />
        <CategorySelectField<LostForm>
          control={control}
          options={LOST_AND_FOUND_CATEGORY_LIST}
          name="lostType"
        />
        <SubwaySelectField control={control} name="subwayLineId" />
        <TitleField<LostForm>
          errors={errors}
          register={register}
          name="title"
        />
        <ContentEditorField<LostForm>
          errors={errors}
          control={control}
          name="content"
        />
        <SubmitButton
          isActive={activity.isActive}
          isSubmitting={isSubmitting}
          buttonText={SUBMIT_BUTTON_TEXT}
          onSubmit={submit}
        />
      </form>
    ),
    [control, errors, handleSubmit, isSubmitting, onError, onSubmit, register],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return <Layout>{memoizedForm}</Layout>;
};

export default CreateLostArticle;
