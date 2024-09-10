import React from 'react';
import type { EditorState } from 'lexical';
import { useForm, Controller } from 'react-hook-form';
import { ActivityComponentType } from '@stackflow/react';

import {
  complaintTypeMap,
  complaintsContentDetail,
} from 'pages/complaint/data';
import type { ShortComplaintType } from 'pages/complaint/model';
import type { ComplaintForm as IComplaintForm } from 'pages/complaint/model/form';
import { usePostComplaintArticle as usePostComplaint } from 'pages/complaint/api/post-article';

import { Layout } from 'widgets';
import { validateContent } from 'features/articles/lib/has-content-error';

import Editor from 'shared/ui/Editor';
import { SelectList } from 'shared/ui/Select/SelectList';
import { ImageUpload } from 'shared/ui/Input/ImageInput';
import { FieldErrorMessage } from 'shared/ui/FieldErrorMessage/FieldErrorMessage';

import * as styles from './ComplaintForm.css';

interface ComplaintFormProps {
  slug: KeyOf<typeof complaintsContentDetail>;
}

const ComplaintForm: ActivityComponentType<ComplaintFormProps> = ({
  params: { slug },
}) => {
  const information = complaintsContentDetail[slug];

  const {
    formState: { errors },
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
  } = useForm<IComplaintForm>({
    mode: 'onBlur',
    defaultValues: {
      content: '',
      imageFiles: null,
      shortContentType: null,
      complaintType: slug,
    },
  });

  const { mutate: createComplaint, isPending } = usePostComplaint();
  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };
  const onSubmit = (data: IComplaintForm) => {
    console.log(':data:', data);
    if (!validateContent(data.content, setError)) return;
    createComplaint(data);
  };

  return (
    <Layout appBar={{ title: complaintTypeMap[slug] }}>
      <form css={styles.wrap} onSubmit={handleSubmit(onSubmit, onError)}>
        <div css={styles.section}>
          <span>첨부 이미지</span>
          <Controller
            name="imageFiles"
            render={({ field }) => (
              <ImageUpload
                {...field}
                hasPreview
                image={field.value}
                disabled={!!field.value}
                onDelete={() => field.onChange(null)}
                onChange={(file) => field.onChange(file)}
              />
            )}
            control={control}
          />
        </div>
        <div css={styles.section}>
          <p>
            {information.title}
            <span css={styles.requireMark}>*</span>
          </p>
          <Controller
            name="shortContentType"
            render={() => (
              <SelectList
                selectList={information.selectList}
                current={getValues('shortContentType')}
                hasError={!!errors?.shortContentType?.message}
                handleChange={(key: ShortComplaintType) => () => {
                  errors?.shortContentType &&
                    setError('shortContentType', null);
                  setValue('shortContentType', key);
                }}
              />
            )}
            control={control}
            rules={{
              required: {
                value: true,
                message: '유형을 선택해주세요',
              },
            }}
          />
          <FieldErrorMessage
            css={styles.errMsgLayout}
            errMsg={errors?.shortContentType?.message}
          />
        </div>
        <div css={styles.section}>
          <p>
            자세한 설명
            <span css={styles.requireMark}>*</span>
          </p>
          <Controller
            name="content"
            render={() => (
              <Editor
                placeholder={
                  '민원 내용을 입력해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 삭제 처리 될 수 있습니다.'
                }
                hasError={!!errors?.content?.message}
                onChange={(targetValue: EditorState) => {
                  errors?.content && setError('content', null);
                  setValue('content', JSON.stringify(targetValue.toJSON()));
                }}
              />
            )}
            control={control}
            rules={{
              required: {
                value: true,
                message: '내용을 입력하세요',
              },
            }}
          />
          <FieldErrorMessage
            css={styles.errMsgLayout}
            errMsg={errors?.content?.message}
          />
        </div>
        <div css={styles.submitGroup}>
          <button type="submit" css={styles.submit} disabled={isPending}>
            민원접수
          </button>
          <div css={styles.indicatorArea} />
        </div>
      </form>
    </Layout>
  );
};

export default ComplaintForm;
