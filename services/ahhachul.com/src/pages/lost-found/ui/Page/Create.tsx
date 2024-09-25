import React, { useMemo, useCallback } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { useCreateLostArticleForm } from 'pages/lost-found/lib/useCreateLostArticleForm';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectFieldProps';
import { TitleField } from 'widgets/form-fields/ui/TitleField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import * as styles from './Create.css';
import { LostForm } from 'pages/lost-found/model/form';

const FORM_TITLE = '글 작성';
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

  const renderForm = useCallback(
    () => (
      <form css={styles.wrap} onSubmit={handleSubmit(onSubmit, onError)}>
        <ImageUploadField<LostForm> control={control} name="imageFiles" />
        <CategorySelectField<LostForm>
          errors={errors}
          control={control}
          options={LOST_AND_FOUND_CATEGORY_LIST}
          name="lostType"
        />
        <TitleField<LostForm>
          errors={errors}
          register={register}
          name="title"
        />
        <ContentEditorField<LostForm>
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
    [control, errors, handleSubmit, isSubmitting, onError, onSubmit, register],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return <Layout appBar={{ title: FORM_TITLE }}>{memoizedForm}</Layout>;
};

export default CreateLostArticle;
