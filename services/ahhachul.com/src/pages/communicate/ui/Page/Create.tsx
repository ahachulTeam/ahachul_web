import React, { useMemo, useCallback } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { useCreateCommunityArticleForm } from 'pages/communicate/lib/useCreateCommunityArticleForm';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectFieldProps';
import { TitleField } from 'widgets/form-fields/ui/TitleField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import * as styles from './Create.css';
import { CommunityForm } from 'pages/communicate/model/form';

const FORM_TITLE = '글 작성';
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

  const renderForm = useCallback(
    () => (
      <form css={styles.wrap} onSubmit={handleSubmit(onSubmit, onError)}>
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
          control={control}
          errors={errors}
          name="content"
        />
        <div css={styles.submitGroup}>
          <button
            type="submit"
            css={styles.submit}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {SUBMIT_BUTTON_TEXT}
          </button>
          <div css={styles.indicatorArea} />
        </div>
      </form>
    ),
    [control, errors, handleSubmit, isSubmitting, onError, onSubmit],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return <Layout appBar={{ title: FORM_TITLE }}>{memoizedForm}</Layout>;
};

export default CreateCommunityArticle;
