import React, { useCallback } from 'react';
import type { EditorState } from 'lexical';
import { useForm } from 'react-hook-form';
import { ActivityComponentType } from '@stackflow/react';
import type { ComplaintForm as IComplaintForm } from 'pages/complaint/model/form';
import { usePostComplaintArticle } from 'pages/complaint/api/post-article';
import { Layout } from 'widgets';
import Editor from 'shared/ui/Editor';
import * as styles from './ComplaintForm.css';

interface ComplaintFormProps {
  slug: string;
}

const ComplaintForm: ActivityComponentType<ComplaintFormProps> = ({
  params: { slug },
}) => {
  const { mutate, isPending } = usePostComplaintArticle();
  const { setValue, handleSubmit } = useForm<IComplaintForm>({
    mode: 'onBlur',
  });

  const changeContent = useCallback((targetValue: EditorState) => {
    setValue('content', JSON.stringify(targetValue.toJSON()));
  }, []);

  const onSubmit = (data: IComplaintForm) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Layout appBar={{ title: slug }}>
      <form css={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
        <div css={styles.section}>
          <span>첨부 이미지</span>
          {/* <ImageUpload handleChangeImage={handleChangeImage} /> */}
        </div>
        <div css={styles.section}>
          <p>
            {slug}
            <span css={styles.requireMark}>*</span>
          </p>
          {/* <SelectComponent
            selectList={COMPLAINTS_ROOM_SERVICE_INFO[params.slug].selectList}
            handleChangeSelect={handleChangeSelect}
          /> */}
        </div>
        <div css={styles.section}>
          <span>자세한 설명</span>
          <Editor
            onChange={changeContent}
            placeholder={
              '민원 내용을 입력해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 삭제 처리 될 수 있습니다.'
            }
          />
        </div>
        <div css={styles.submitGroup}>
          <button type="submit" css={styles.submitBtn} disabled={isPending}>
            민원접수
          </button>
          <div css={styles.indicatorArea} />
        </div>
      </form>
    </Layout>
  );
};

export default ComplaintForm;
