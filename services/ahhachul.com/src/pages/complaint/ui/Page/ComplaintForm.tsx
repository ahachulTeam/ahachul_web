import React, { useMemo, useCallback } from 'react';
import { ActivityComponentType, useActivity } from '@stackflow/react';
import { Layout } from 'widgets';
import type { ComplaintForm as IComplaintForm } from 'pages/complaint/model/form';
import { useCreateComplaintForm } from 'pages/complaint/lib/useCreateComplaintForm';
import {
  complaintTypeMap,
  complaintsContentDetail,
} from 'pages/complaint/data';
import { ImageUploadField } from 'widgets/form-fields/ui/ImageUploadField';
import { CategorySelectField } from 'widgets/form-fields/ui/CategorySelectField';
import { ContentEditorField } from 'widgets/form-fields/ui/ContentEditorField';
import { SubmitButton } from 'widgets/form-fields/ui/SubmitButton';
import * as styles from './ComplaintForm.css';

const SUBMIT_BUTTON_TEXT = '등록';
const EDITOR_PLACEHOLDER = `민원 내용을 입력해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 삭제 처리 될 수 있습니다.`;

interface ComplaintFormProps {
  slug: KeyOf<typeof complaintsContentDetail>;
}

const ComplaintForm: ActivityComponentType<ComplaintFormProps> = ({
  params: { slug },
}) => {
  const information = complaintsContentDetail[slug];

  const {
    control,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    onSubmit,
    onError,
  } = useCreateComplaintForm(slug);
  const submit = handleSubmit(onSubmit, onError);

  const activity = useActivity();
  const renderForm = useCallback(
    () => (
      <form css={styles.wrap} onSubmit={submit}>
        <ImageUploadField<IComplaintForm> control={control} name="imageFiles" />
        <CategorySelectField<IComplaintForm>
          control={control}
          options={information.selectList}
          name="shortContentType"
          label={information.title}
          rules={{
            required: '유형을 선택해주세요',
          }}
        />
        <ContentEditorField<IComplaintForm>
          placeholder={EDITOR_PLACEHOLDER}
          isRichEditor={false}
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
    [
      control,
      errors,
      handleSubmit,
      information,
      isSubmitting,
      onError,
      onSubmit,
    ],
  );

  const memoizedForm = useMemo(() => renderForm(), [renderForm]);

  return (
    <Layout appBar={{ title: complaintTypeMap[slug] }}>{memoizedForm}</Layout>
  );
};

export default ComplaintForm;
