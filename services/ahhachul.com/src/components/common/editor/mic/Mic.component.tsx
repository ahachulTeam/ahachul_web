import { useEffect, useRef, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { MicIcon } from '@/assets/icons/system';

import * as S from './Mic.styled';

import { SPEECH_TO_TEXT_COMMAND } from '../plugins';

const Mic = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isSpeechToText, setIsSpeechToText] = useState(false);

  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

  const handleMicClick = () => {
    editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
    setIsSpeechToText(prev => !prev);
  };

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
    <S.ToolbarContainer>
      <S.ButtonContainer ref={toolbarRef}>
        {isSpeechRecognitionSupported && (
          <S.MicButton
            type="button"
            isActive={isSpeechToText}
            title="Speech To Text"
            aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`}
            onClick={handleMicClick}
          >
            <MicIcon />
          </S.MicButton>
        )}
      </S.ButtonContainer>
    </S.ToolbarContainer>
  );
};

export default Mic;
