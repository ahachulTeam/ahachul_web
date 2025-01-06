'use client';

import type { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import {
  OnChangePlugin,
  SpeechToTextPlugin,
  SpeechToTextToolbarPlugin,
} from '@/app/(site)/_component/Editor';

const theme = {};

function onError(error: Error) {
  console.error(error);
}

const Placeholder = ({
  placeholder = '게시글 내용을 작성해 주세요.',
}: {
  placeholder?: string;
}) => (
  <pre
    id="editor-placeholder"
    className="absolute top-[15px] left-[10px] inline-block text-body-large-semi leading-5 text-gray-70 whitespace-pre-wrap break-words break-all select-none pointer-events-none font-sans"
  >
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

export const Editor = ({
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
            <ContentEditable className="h-full w-full border rounded-[5px] p-3 overflow-hidden text-wrap text-gray-90 text-body-large-semi focus:outline-none" />
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
