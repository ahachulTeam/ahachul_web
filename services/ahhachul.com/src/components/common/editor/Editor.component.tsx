import { css } from '@emotion/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import type { EditorState } from 'lexical';

import * as S from './Editor.styled';
import Mic from './mic/Mic.component';
import Placeholder from './placeholder/Placeholder.component';
import { OnChangePlugin, SpeechToTextPlugin } from './plugins';

type Props = {
  showMic?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  readonly?: boolean;
  placeholder?: string;
  initialState?: string;
  overrideCss?: ReturnType<typeof css>;
  onChange?: (editorState: EditorState | null) => void;
};

const Editor = ({
  showMic = true,
  readonly = false,
  placeholder = '',
  initialState = '',
  disabled = false,
  overrideCss,
  onChange,
}: Props) => {
  const initialConfig = {
    namespace: 'plainEditor',
    onError(error: Error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <S.EditorContainer id="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable css={[S.contentEditableCss(disabled), overrideCss]} />}
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={onChange}
          readonly={readonly || disabled}
          initialState={initialState}
        />
        {showMic && (
          <>
            <SpeechToTextPlugin />
            <Mic />
          </>
        )}
      </S.EditorContainer>
    </LexicalComposer>
  );
};

export default Editor;
