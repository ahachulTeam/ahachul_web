import { useMemo, useCallback } from 'react';

import { ActivityComponentType, useActivity } from '@stackflow/react';
import { useCreateLostArticleForm } from 'pages/lost-found/lib/useCreateLostArticleForm';
import type { LostForm } from 'pages/lost-found/model/form';
import { Layout } from 'widgets';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import SubwaySelectField from 'widgets/form-fields/ui/SubwaySelectField';
import { TitleField } from 'widgets/form-fields/ui/TitleField';

import * as styles from './Create.css';

const SUBMIT_BUTTON_TEXT = '등록';
const LOST_AND_FOUND_CATEGORY_LIST = {
  LOST: '분실물',
  ACQUIRE: '습득물',
};

const NewLostFoundPage: ActivityComponentType = () => {
  const { control, isSubmitting, register, handleSubmit, onSubmit, onError } =
    useCreateLostArticleForm();
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
        <TitleField<LostForm> control={control} register={register} name="title" />
        <ContentEditorField<LostForm> control={control} name="content" />
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

  return <Layout>{memoizedForm}</Layout>;
};

export default NewLostFoundPage;
