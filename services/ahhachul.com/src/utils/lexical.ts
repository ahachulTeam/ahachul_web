import type { UseFormSetError, Path } from 'react-hook-form';

import type { LexicalNode } from 'lexical';

interface LexicalContent {
  root?: {
    children?: Array<{
      children?: Array<unknown>;
    }>;
  };
}

type WithContent<T> = T & {
  content: string | null;
};

/**
 * Lexical 에디터의 content가 비어있는지 확인하기 위한 유틸리티 함수.
 * @throws {Error} JSON 파싱 실패 시 에러가 발생합니다.
 */
export const isLexicalContentEmpty = (content: string): boolean => {
  try {
    const parsedContent = JSON.parse(content) as LexicalContent;
    return !parsedContent?.root?.children?.[0]?.children?.length;
  } catch (error) {
    console.error('Failed to parse Lexical content:', error);
    return true;
  }
};

/**
 * Lexical 에디터의 content를 검증하고 에러를 설정하기 위한 유틸리티 함수.
 */
export const validateLexicalContent = <T extends object>(
  content: string | null,
  setError: UseFormSetError<WithContent<T>>,
): boolean => {
  if (!content || isLexicalContentEmpty(content)) {
    setError('content' as Path<WithContent<T>>, {
      type: 'required',
      message: '내용을 입력해주세요',
    });
    return false;
  }
  return true;
};

export const isLexicalContent = (content: unknown): content is LexicalNode => {
  if (typeof content !== 'string') return false;

  try {
    const parsed = JSON.parse(content);

    if (!parsed || typeof parsed !== 'object') return false;

    const { root } = parsed;

    if (!root || typeof root !== 'object') return false;

    const { children } = root;

    if (!children || !Array.isArray(children)) return false;

    return true;
  } catch {
    return false;
  }
};
