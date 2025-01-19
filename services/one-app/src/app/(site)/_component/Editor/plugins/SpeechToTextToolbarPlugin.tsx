'use client';

import { useEffect, useRef, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { MicIcon } from '@/common/assets/icons';

import { SPEECH_TO_TEXT_COMMAND } from './SpeechToTextPlugin';

const SpeechToTextToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isSpeechToText, setIsSpeechToText] = useState(false);

  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서 Speech Recognition 지원 여부 확인
    if (
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    ) {
      setIsSpeechRecognitionSupported(true);
    }
  }, []);

  return (
    <article className="absolute bottom-0 right-0 p-3">
      <div className="flex justify-end" ref={toolbarRef}>
        {isSpeechRecognitionSupported && (
          <button
            type="button"
            className={'toolbar-item spaced mic ' + (isSpeechToText ? 'active' : '')}
            style={{ padding: '0 !important' }}
            title="Speech To Text"
            aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`}
            onClick={() => {
              editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
              setIsSpeechToText(prev => !prev);
            }}
          >
            <MicIcon />
          </button>
        )}
      </div>
    </article>
  );
};

export default SpeechToTextToolbarPlugin;
