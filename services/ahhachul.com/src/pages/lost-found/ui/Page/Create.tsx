import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { validateContent } from 'features/articles/lib/has-content-error';
import Editor from 'shared/ui/Editor';
import { SelectList } from 'shared/ui/Select/SelectList';
import { ImageUpload } from 'shared/ui/Input/ImageInput';
import { FieldErrorMessage } from 'shared/ui/FieldErrorMessage/FieldErrorMessage';
import * as styles from './Create.css';
import { EditorState } from 'lexical';
import { usePostLostAndFoundArticle } from 'pages/lost-found/api/post-article';
import { LostForm } from 'pages/lost-found/model/form';
import { LostType } from 'pages/lost-found/model';

const lostAndFoundCategoryList = {
  LOST: '분실물',
  ACQUIRE: '습득물',
};

const CreateLostArticle: ActivityComponentType = () => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
  } = useForm<LostForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      imageFiles: null,
      lostType: 'LOST',
    },
  });

  const { mutate: createComplaint, isPending } = usePostLostAndFoundArticle();
  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };
  const onSubmit = (data: LostForm) => {
    console.log(':data:', data);
    if (!validateContent(data.content, setError)) return;
    createComplaint(data);
  };

  return (
    <Layout appBar={{ title: '글 작성' }}>
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
            카테고리
            <span css={styles.requireMark}>*</span>
          </p>
          <Controller
            name="lostType"
            render={() => (
              <SelectList
                selectList={lostAndFoundCategoryList}
                current={getValues('lostType')}
                hasError={!!errors?.lostType?.message}
                handleChange={(key: LostType) => () => {
                  errors?.lostType && setError('lostType', null);
                  setValue('lostType', key);
                }}
              />
            )}
            control={control}
          />
        </div>
        <div css={styles.section}>
          <p>
            제목
            <span css={styles.requireMark}>*</span>
          </p>
          <input
            placeholder="제목"
            aria-invalid={!!errors?.title?.message}
            {...register('title', {
              required: {
                value: true,
                message: '제목을 입력해주세요',
              },
              minLength: {
                value: 2,
                message: '제목은 2자 이상 입력해주세요.',
              },
              maxLength: 20,
            })}
          />
          <FieldErrorMessage
            css={styles.errMsgLayout}
            errMsg={errors?.title?.message}
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
                isRich
                placeholder={
                  '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
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
                message: '내용을 입력해주세요',
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

export default CreateLostArticle;
