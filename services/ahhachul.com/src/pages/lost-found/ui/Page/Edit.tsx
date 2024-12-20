import React, { useMemo, useCallback } from 'react';
import { ActivityComponentType, useActivity } from '@stackflow/react';
import { Layout } from 'widgets';
import type { LostForm } from 'pages/lost-found/model/form';
import { useUpdateLostArticleForm } from 'pages/lost-found/lib/useUpdateLostArticleForm';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { TitleField } from 'widgets/form-fields/ui/TitleField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import SubwaySelectField from 'widgets/form-fields/ui/SubwaySelectField';
import { WithArticleId } from 'features/articles';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';
import * as styles from './Create.css';

const SUBMIT_BUTTON_TEXT = '등록';
const LOST_AND_FOUND_CATEGORY_LIST = {
  LOST: '분실물',
  ACQUIRE: '습득물',
};

const EditInner = ({ articleId }: WithArticleId) => {
  const { data: article } = useGetLostFoundDetail(articleId);

  const { control, isSubmitting, register, handleSubmit, onSubmit, onError } =
    useUpdateLostArticleForm({
      title: article.title,
      content: article.content,
      lostType: article.lostType,
      subwayLineId: article.subwayLineId,
      imageFiles: article.images,
    });
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
          control={control}
          register={register}
          name="title"
        />
        <ContentEditorField<LostForm>
          name="content"
          control={control}
          initialState={article.content}
        />
        <SubmitButton
          isActive={activity.isActive}
          isSubmitting={isSubmitting}
          buttonText={SUBMIT_BUTTON_TEXT}
          onSubmit={submit}
        />
      </form>
    ),
    [control, handleSubmit, isSubmitting, onError, onSubmit, register],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return memoizedForm;
};

const EditLostArticle: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <EditInner articleId={articleId} />
    </Layout>
  );
};

export default EditLostArticle;
