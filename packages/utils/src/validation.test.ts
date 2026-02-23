import { describe, expect, it } from 'vitest';

import {
  isBlankText,
  maskEmail,
  normalizeInputText,
  validateNickname,
  validateRequiredLexicalContent,
  validateRequiredText,
} from './validation';

const EMPTY_LEXICAL_CONTENT = JSON.stringify({
  root: {
    children: [
      {
        children: [],
      },
    ],
  },
});

const VALID_LEXICAL_CONTENT = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            text: '내용',
          },
        ],
      },
    ],
  },
});

describe('validation utils', () => {
  it('normalizes text with NFC and trims whitespace', () => {
    expect(normalizeInputText('가  ')).toBe('가');
  });

  it('identifies blank text correctly', () => {
    expect(isBlankText('   ')).toBe(true);
    expect(isBlankText('내용')).toBe(false);
  });

  it('masks email local-part for privacy-safe display', () => {
    expect(maskEmail('email@mail.com')).toBe('em***@mail.com');
    expect(maskEmail('ab@mail.com')).toBe('a*@mail.com');
    expect(maskEmail('a@mail.com')).toBe('a*@mail.com');
    expect(maskEmail('  invalid-email  ')).toBe('invalid-email');
    expect(maskEmail('')).toBe('');
  });

  it('validates nickname rules by code', () => {
    expect(validateNickname('').code).toBe('empty');
    expect(validateNickname('a').code).toBe('tooShort');
    expect(validateNickname('a'.repeat(11)).code).toBe('tooLong');
    expect(validateNickname('닉네임!').code).toBe('invalidFormat');
    expect(validateNickname('  ahhachul_1 ').code).toBe('valid');
  });

  it('validates required text with custom message', () => {
    expect(validateRequiredText('   ', { requiredMessage: '필수값' })).toEqual({
      isValid: false,
      normalized: '',
      message: '필수값',
    });
  });

  it('validates lexical required content', () => {
    expect(validateRequiredLexicalContent(EMPTY_LEXICAL_CONTENT).isValid).toBe(false);
    expect(validateRequiredLexicalContent(VALID_LEXICAL_CONTENT).isValid).toBe(true);
    expect(validateRequiredLexicalContent('일반 텍스트').isValid).toBe(true);
  });
});
