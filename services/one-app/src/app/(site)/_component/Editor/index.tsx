'use client';

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
  <pre className="absolute text-wrap text-[15px] leading-[1.5] tracking-[-0.02em] top-[12px] text-[#95979F] left-[12px] -z-50 font-sans">
    {placeholder}
  </pre>
);

const Editor = ({ placeholder, onChange, initialState }: any) => {
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
            <ContentEditable className="h-full w-full border rounded-[5px] p-3 overflow-hidden text-wrap text-[15px] text-[#33333E] leading-[1.5] tracking-[-0.02em]" />
          }
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <SpeechToTextPlugin />
        <SpeechToTextToolbarPlugin />
        <OnChangePlugin onChange={onChange} initialState={initialState} />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
