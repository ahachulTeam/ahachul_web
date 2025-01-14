import { useRef, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { SPEECH_TO_TEXT_COMMAND } from './SpeechToTextPlugin';

import { MicIcon } from '../static/icons/mic';

let SUPPORT_SPEECH_RECOGNITION = false;
if (typeof window !== 'undefined') {
  SUPPORT_SPEECH_RECOGNITION = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export const SpeechToTextToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isSpeechToText, setIsSpeechToText] = useState(false);

  return (
    <article className="toolbar-wrapper">
      <div className="toolbar right-align" ref={toolbarRef}>
        {SUPPORT_SPEECH_RECOGNITION && (
          <button
            type="button"
            className={'toolbar-item spaced mic ' + (isSpeechToText ? 'active' : '')}
            style={{ padding: '0 !important' }}
            title="Speech To Text"
            aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`}
            onClick={() => {
              editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
              setIsSpeechToText(!isSpeechToText);
            }}
          >
            <MicIcon />
          </button>
        )}
      </div>
    </article>
  );
};
