'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useDebounce } from '@/hook';

import { checkNickname } from './checkNickname';

const MAX_LENGTH = 10;
const MIN_LENGTH = 2;

enum ErrorStatus {
  TOO_SHORT = `닉네임은 ${MIN_LENGTH}자 이상 입력해주세요.`,
  TOO_LONG = `한글,영문 ${MAX_LENGTH}자 이하로 입력해주세요.`,
  DUPLICATED_NAME = '중복인 닉네임이라 사용할 수 없습니다.',
  INVALID_FORMAT = '지원하지 않는 형식입니다.',
}

export const useCheckNickname = () => {
  const { mutateAsync: nicknameChecking, status } = useMutation({
    mutationFn: checkNickname,
  });

  const [nickname, setNickname] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isNicknameChecking = status === 'pending';
  const isValidateOk = nickname.length >= MIN_LENGTH && errorMessage === '';
  const isValidateError = isTouched && (nickname.length < MIN_LENGTH || errorMessage !== '');

  const disabled =
    errorMessage !== '' || nickname.length < MIN_LENGTH || nickname.length > MAX_LENGTH;

  const lengthIndicator = `${nickname.length} / ${MAX_LENGTH}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_LENGTH);
    setNickname(value);
    if (!isTouched) setIsTouched(true);
    checkNicknameValidity(value);
  };

  const checkNicknameValidity = useDebounce(async (value: string) => {
    if (value.length < MIN_LENGTH) {
      setErrorMessage(ErrorStatus.TOO_SHORT);
      return;
    }
    if (value.length > MAX_LENGTH) {
      setErrorMessage(ErrorStatus.TOO_LONG);
      return;
    }

    try {
      const res = await nicknameChecking(value);
      if (!res.result.available) {
        setErrorMessage(ErrorStatus.DUPLICATED_NAME);
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(ErrorStatus.INVALID_FORMAT);
    }
  }, 500);

  const nickNameStatusMessage = (() => {
    if (errorMessage) {
      return errorMessage;
    }
    if (isValidateOk) {
      return '사용할 수 있는 닉네임 입니다.';
    }
    return `닉네임은 ${MIN_LENGTH}자 이상 입력해주세요.`;
  })();

  return {
    nickname,
    disabled,
    errorMessage,
    lengthIndicator,
    isTouched,
    isValidateOk,
    isValidateError,
    isNicknameChecking,
    nickNameStatusMessage,
    handleInputChange,
  };
};
