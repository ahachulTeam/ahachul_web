import { Control, Controller, Path, useFormState } from 'react-hook-form';

import { EditorState } from 'lexical';
import Editor from 'shared/ui/Editor';
import { FieldErrorMessage } from 'widgets/form-fields/ui/FieldErrorMessage';

import * as styles from './FormField.css';

interface ContentEditorFieldProps<T> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  isRichEditor?: boolean;
  initialState?: string;
}

export const ContentEditorField = <T,>({
  control,
  name,
  placeholder,
  isRichEditor,
  initialState,
}: ContentEditorFieldProps<T>) => {
  const { errors } = useFormState({ control });
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <div css={styles.section}>
      <p>
        자세한 설명
        <span css={styles.requireMark}>*</span>
      </p>
      <Controller
        name={name}
        control={control}
        rules={{
          required: '내용을 입력해주세요',
        }}
        render={({ field }) => (
          <Editor
            placeholder={
              placeholder ??
              '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
            }
            isRich={isRichEditor}
            hasError={!!errors[name]?.message}
            initialState={initialState}
            onChange={(targetValue: EditorState) => {
              field.onChange(JSON.stringify(targetValue.toJSON()));
            }}
          />
        )}
      />
      <FieldErrorMessage css={styles.errMsgLayout} errMsg={errorMsg} />
    </div>
  );
};
