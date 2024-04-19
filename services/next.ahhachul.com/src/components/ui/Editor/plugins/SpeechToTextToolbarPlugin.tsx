import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRef, useState } from 'react';
import IconMic from '@/src/static/icons/editor/IconMic';
import { SPEECH_TO_TEXT_COMMAND } from './SpeechToTextPlugin';

let SUPPORT_SPEECH_RECOGNITION = false;
if (typeof window !== 'undefined') {
  SUPPORT_SPEECH_RECOGNITION = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

const SpeechToTextToolbarPlugin = () => {
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
            <IconMic className="format" />
          </button>
        )}
      </div>
    </article>
  );
};

export default SpeechToTextToolbarPlugin;
