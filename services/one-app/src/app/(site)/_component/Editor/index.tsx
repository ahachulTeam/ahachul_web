'use client';

import type { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import SpeechToTextToolbarPlugin from './plugins/SpeechToTextToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';

const theme = {};

function onError(error: Error) {
  console.error(error);
}

const Placeholder = ({
  placeholder = '게시글 내용을 작성해 주세요.',
}: {
  placeholder?: string;
}) => (
  <pre className="absolute text-wrap text-body-large-semi top-[12px] text-gray-70 left-[12px] -z-50 font-sans">
    {placeholder}
  </pre>
);

type Props = {
  showMic?: boolean;
  readonly?: boolean;
  placeholder?: string;
  initialState?: string;
  onChange?: (editorState: EditorState | null) => void;
};

const Editor = ({
  showMic,
  readonly,
  placeholder,
  initialState,
  onChange,
}: Props) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative h-full">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-full w-full border rounded-[5px] p-3 overflow-hidden text-wrap text-gray-90 text-body-large-semi" />
          }
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={onChange}
          readonly={readonly}
          initialState={initialState}
        />
        {showMic && (
          <>
            <SpeechToTextPlugin />
            <SpeechToTextToolbarPlugin />
          </>
        )}
      </div>
    </LexicalComposer>
  );
};

export default Editor;
