'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { updateUser } from '../../my/_lib/updateUser';
import { checkNickname } from '../_lib/checkNickname';
import { cn } from '@/common/utils/cn';
import { debounce } from '@/common/utils';
import { useTemporaryAuthStore } from '@/store/auth';
import { AuthService } from '@/common/service/AuthService';
import CheckIcon from '@/common/assets/icons/check';
import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import AlertCircleIcon from '@/common/assets/icons/alert-circle';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

const MAX_LENGTH = 10;
const MIN_LENGTH = 2;

const NicknameSetup = () => {
  const router = useRouter();
  const { auth, reset: resetTemporaryAuth } = useTemporaryAuthStore();

  const handleLoginDone = () => {
    if (!auth) return;

    const { accessToken, refreshToken } = auth;
    AuthService.setToken(accessToken, refreshToken);
    resetTemporaryAuth();
    router.replace('/');
  };

  const { mutateAsync: updateUserInfoAndTryLoginDone } = useMutation({
    mutationFn: updateUser,
    onSuccess: handleLoginDone,
  });

  const { mutateAsync: nicknameChecking, status } = useMutation({
    mutationFn: checkNickname,
  });

  const [nickname, setNickname] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = status === 'pending';
  const isSuccess = nickname.length >= MIN_LENGTH && errorMessage === '';
  const isError =
    isTouched && (nickname.length < MIN_LENGTH || errorMessage !== '');

  const disabled =
    errorMessage !== '' ||
    nickname.length < MIN_LENGTH ||
    nickname.length > MAX_LENGTH;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_LENGTH);
    setNickname(value);
    if (!isTouched) setIsTouched(true);
    checkNicknameValidity(value);
  };

  const checkNicknameValidity = debounce(async (value: string) => {
    if (value.length <= 1) {
      setErrorMessage('닉네임은 2자 이상 입력해주세요.');
      return;
    }
    if (value.length > MAX_LENGTH) {
      setErrorMessage('한글,영문 10자 이하로 입력해주세요.');
      return;
    }

    try {
      const res = await nicknameChecking(value);
      if (!res.result.available) {
        setErrorMessage('중복인 닉네임이라 사용할 수 없습니다.');
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('지원하지 않는 형식입니다.');
    }
  }, 500);

  const handleSubmitFormField = async () => {
    if (disabled) return;

    // TODO: Global Loader 추가하기
    // setEnabledGlobalLoading(true);
    try {
      await updateUserInfoAndTryLoginDone(nickname);
    } catch (error) {
      console.error(error);
      alert('유저 정보 수정 에러 발생!');
      // TODO: 추가적인 에러 처리
    } finally {
      // setEnabledGlobalLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black pt-9 px-5">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeftIcon />
        </button>
        <h2 className="ml-2 text-white">회원가입</h2>
      </div>

      <h1 className="pb-8 text-white text-2xl font-semibold">
        <strong className="text-[#2ACF6C]">닉네임</strong>을 설정해주세요
      </h1>

      <div className="w-full space-y-2">
        <div className="relative">
          <input
            value={nickname}
            onChange={handleInputChange}
            className={cn(
              'w-full h-12 bg-white/10 border-0 px-3 text-white placeholder:text-gray-500',
              'focus:outline-none focus:bg-white/15',
              isError && 'ring-2 ring-red-500',
              isSuccess && 'ring-2 ring-[#2ACF6C]',
            )}
            placeholder="닉네임을 입력해주세요"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isError && <AlertCircleIcon />}
            {isSuccess && <CheckIcon />}
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <span
            className={cn(
              'text-sm',
              isError && 'text-red-500',
              isSuccess && 'text-[#2ACF6C]',
              !isTouched && 'text-gray-500',
            )}
          >
            {errorMessage ||
              (isSuccess
                ? '사용할 수 있는 닉네임 입니다.'
                : '닉네임은 2자 이상 입력해주세요.')}
          </span>
          <span className="text-sm text-gray-500">
            {nickname.length} / {MAX_LENGTH}
          </span>
        </div>
      </div>

      <button
        disabled={disabled}
        className={cn(
          'w-full h-12 mt-8 text-white',
          'bg-[#2ACF6C] hover:bg-[#2ACF6C]/90',
          'disabled:bg-gray-600 disabled:cursor-not-allowed',
          isLoading && 'cursor-events-none',
        )}
        onClick={handleSubmitFormField}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <SpinnerIcon className="animate-spin mr-2" />
          </span>
        ) : (
          '완료'
        )}
      </button>
    </main>
  );
};

export default NicknameSetup;
