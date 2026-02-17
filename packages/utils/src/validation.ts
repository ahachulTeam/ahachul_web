import { isLexicalContent, isLexicalContentEmpty } from './lexical';

export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 10;
export const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9_]+$/;

export type NicknameValidationCode = 'valid' | 'empty' | 'tooShort' | 'tooLong' | 'invalidFormat';

export interface NicknameValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface NicknameValidationResult {
  isValid: boolean;
  code: NicknameValidationCode;
  normalized: string;
  message: string;
}

export interface RequiredTextValidationResult {
  isValid: boolean;
  normalized: string;
  message: string;
}

export interface RequiredTextValidationOptions {
  requiredMessage?: string;
}

export function normalizeInputText(value: string | null | undefined): string {
  return (value ?? '').normalize('NFC').trim();
}

export function isBlankText(value: string | null | undefined): boolean {
  return normalizeInputText(value).length === 0;
}

export function getNormalizedTextLength(value: string | null | undefined): number {
  return normalizeInputText(value).length;
}

export function validateNickname(
  value: string,
  options: NicknameValidationOptions = {},
): NicknameValidationResult {
  const minLength = options.minLength ?? NICKNAME_MIN_LENGTH;
  const maxLength = options.maxLength ?? NICKNAME_MAX_LENGTH;
  const pattern = options.pattern ?? NICKNAME_PATTERN;
  const normalized = normalizeInputText(value);

  if (!normalized.length) {
    return {
      isValid: false,
      code: 'empty',
      normalized,
      message: `닉네임은 ${minLength}자 이상 입력해주세요.`,
    };
  }

  if (normalized.length < minLength) {
    return {
      isValid: false,
      code: 'tooShort',
      normalized,
      message: `닉네임은 ${minLength}자 이상 입력해주세요.`,
    };
  }

  if (normalized.length > maxLength) {
    return {
      isValid: false,
      code: 'tooLong',
      normalized,
      message: `닉네임은 ${maxLength}자 이하로 입력해주세요.`,
    };
  }

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      code: 'invalidFormat',
      normalized,
      message: '한글, 영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.',
    };
  }

  return {
    isValid: true,
    code: 'valid',
    normalized,
    message: '',
  };
}

export function validateRequiredText(
  value: string | null | undefined,
  options: RequiredTextValidationOptions = {},
): RequiredTextValidationResult {
  const requiredMessage = options.requiredMessage ?? '필수 입력값입니다.';
  const normalized = normalizeInputText(value);

  if (!normalized.length) {
    return {
      isValid: false,
      normalized,
      message: requiredMessage,
    };
  }

  return {
    isValid: true,
    normalized,
    message: '',
  };
}

export function validateRequiredLexicalContent(
  value: string | null | undefined,
  options: RequiredTextValidationOptions = {},
): RequiredTextValidationResult {
  const requiredMessage = options.requiredMessage ?? '내용을 입력해주세요';
  const textValidation = validateRequiredText(value, { requiredMessage });
  if (!textValidation.isValid) {
    return textValidation;
  }

  const normalized = textValidation.normalized;
  if (isLexicalContent(normalized) && isLexicalContentEmpty(normalized)) {
    return {
      isValid: false,
      normalized,
      message: requiredMessage,
    };
  }

  return {
    isValid: true,
    normalized,
    message: '',
  };
}
