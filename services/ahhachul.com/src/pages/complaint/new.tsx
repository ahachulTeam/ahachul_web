import { useMemo, useCallback } from 'react';

import { ActivityComponentType, useActivity } from '@stackflow/react';
import { useCreateCommunityArticleForm } from 'pages/communicate/lib/useCreateCommunityArticleForm';
import type { CommunityForm } from 'pages/communicate/model/form';
import { Layout } from 'widgets';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import { TitleField } from 'widgets/form-fields/ui/TitleField';

import * as styles from './Create.css';

const SUBMIT_BUTTON_TEXT = '등록';
const COMMUNITY_CATEGORY_LIST = {
  FREE: '자유',
  INSIGHT: '정보',
  QUESTION: '질문',
};

const NewComplaintPage: ActivityComponentType = () => {
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
          control={control}
          options={COMMUNITY_CATEGORY_LIST}
          name="categoryType"
        />
        <TitleField<CommunityForm> control={control} register={register} name="title" />
        <ContentEditorField<CommunityForm> isRichEditor control={control} name="content" />
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

export default NewComplaintPage;
