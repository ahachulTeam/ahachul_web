import React, { useMemo, useCallback } from 'react';
import { ActivityComponentType, useActivity } from '@stackflow/react';
import { Layout } from 'widgets';
import type { CommunityForm } from 'pages/communicate/model/form';
import { useCreateCommunityArticleForm } from 'pages/communicate/lib/useCreateCommunityArticleForm';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { TitleField } from 'widgets/form-fields/ui/TitleField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import * as styles from './Create.css';

const SUBMIT_BUTTON_TEXT = '등록';
const COMMUNITY_CATEGORY_LIST = {
  FREE: '자유',
  INSIGHT: '정보',
  QUESTION: '질문',
};

const CreateCommunityArticle: ActivityComponentType = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    onSubmit,
    onError,
  } = useCreateCommunityArticleForm();
  const submit = handleSubmit(onSubmit, onError);

  const activity = useActivity();
  const renderForm = useCallback(
    () => (
      <form css={styles.wrap} onSubmit={submit}>
        <ImageUploadField<CommunityForm> control={control} name="imageFiles" />
        <CategorySelectField<CommunityForm>
          errors={errors}
          control={control}
          options={COMMUNITY_CATEGORY_LIST}
          name="categoryType"
        />
        <TitleField<CommunityForm>
          errors={errors}
          register={register}
          name="title"
        />
        <ContentEditorField<CommunityForm>
          isRichEditor
          control={control}
          errors={errors}
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
    [control, errors, handleSubmit, isSubmitting, onError, onSubmit],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return <Layout>{memoizedForm}</Layout>;
};

export default CreateCommunityArticle;
