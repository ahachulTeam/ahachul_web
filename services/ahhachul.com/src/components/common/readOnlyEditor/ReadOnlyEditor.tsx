import { css } from '@emotion/react';

import { UiComponent } from '@/components';

import * as S from './ReadOnlyEditor.styled';

interface ReadonlyEditorProps {
  content: string;
  overrideCss?: ReturnType<typeof css>;
}

const ReadonlyEditor = ({ content, overrideCss }: ReadonlyEditorProps) => {
  return (
    <S.EditorContainer css={overrideCss}>
      <UiComponent.Editor readonly showMic={false} initialState={content} />
    </S.EditorContainer>
  );
};

export default ReadonlyEditor;
