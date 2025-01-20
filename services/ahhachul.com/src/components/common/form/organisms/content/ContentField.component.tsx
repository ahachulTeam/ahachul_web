import {
  Controller,
  useFormContext,
  type Path,
  type FieldValues,
  type ControllerRenderProps,
} from 'react-hook-form';

import type { EditorState } from 'lexical';

import { FormComponent, UiComponent } from '@/components';

import * as S from './ContentField.styled';

interface ContentEditorFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  initialState?: string;
}

const ContentEditorField = <T extends FieldValues>({
  name,
  placeholder,
  initialState,
}: ContentEditorFieldProps<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  const onChangeEditorContent = (
    field: ControllerRenderProps<T, Path<T>>,
    editorState: EditorState | null,
  ) => {
    if (editorState) {
      field.onChange(JSON.stringify(editorState.toJSON()));
    } else {
      field.onChange('');
    }
  };

  return (
    <FormComponent.FormSection>
      <div>
        <p>자세한 설명</p>
        <FormComponent.RequiredMark />
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: '내용을 입력해주세요',
        }}
        render={({ field }) => {
          return (
            <UiComponent.Editor
              placeholder={
                placeholder ??
                '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
              }
              initialState={initialState}
              hasError={!!errors[name]?.message}
              overrideCss={S.editorOverrideCss}
              onChange={editorState => onChangeEditorContent(field, editorState)}
            />
          );
        }}
      />
      <FormComponent.ErrorMessage errMsg={errorMsg} css={S.errorStyle} />
    </FormComponent.FormSection>
  );
};

export default ContentEditorField;
