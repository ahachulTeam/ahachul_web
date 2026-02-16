import type { UseFormSetError, Path } from 'react-hook-form';

import {
  extractTextFromLexical,
  isLexicalContent,
  isLexicalContentEmpty,
  validateRequiredLexicalContent,
} from '@ahhachul/utils';

type WithContent<T> = T & {
  content: string | null;
};

/**
 * Lexical 에디터의 content를 검증하고 에러를 설정하기 위한 유틸리티 함수.
 */
export const validateLexicalContent = <T extends object>(
  content: string | null,
  setError: UseFormSetError<WithContent<T>>,
): boolean => {
  const validation = validateRequiredLexicalContent(content, {
    requiredMessage: '내용을 입력해주세요',
  });

  if (!validation.isValid) {
    setError('content' as Path<WithContent<T>>, {
      type: 'required',
      message: validation.message,
    });
    return false;
  }
  return true;
};

export { extractTextFromLexical, isLexicalContent, isLexicalContentEmpty };
