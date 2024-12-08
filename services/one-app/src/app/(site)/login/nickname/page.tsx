'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { updateUser } from '../../my/_lib/updateUser';
import { useCheckNickname } from '../_lib/useCheckNickname';
import { renderIndicatorIcon } from '../_lib/utilityFunctions';
import { useTemporaryAuthStore } from '@/store/auth';
import { AuthService } from '@/common/service/AuthService';
import { cn } from '@/common/utils/cn';
import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

const NicknameSetup = () => {
  const router = useRouter();
  const {
    nickname,
    disabled,
    lengthIndicator,
    isTouched,
    isValidateOk,
    isValidateError,
    isNicknameChecking,
    nickNameStatusMessage,
    handleInputChange,
  } = useCheckNickname();

  const { auth, reset: removeTemporaryAuth } = useTemporaryAuthStore(
    useShallow((state) => ({
      auth: state.auth,
      reset: state.reset,
    })),
  );
  const { mutate: updateUserAndTryLoginProcessDone, status } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (!auth) return;

      const { accessToken, refreshToken } = auth;
      AuthService.setToken(accessToken, refreshToken);
      removeTemporaryAuth();
      router.replace('/');
    },
  });

  const handleSubmit = () => {
    if (disabled || !auth) return;
    updateUserAndTryLoginProcessDone({ nickname, auth });
  };

  const isUpdating = status === 'pending';
  const isProcessing = isNicknameChecking || isUpdating;

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
              isValidateError && 'ring-2 ring-red-500',
              isValidateOk && 'ring-2 ring-[#2ACF6C]',
            )}
            placeholder="닉네임을 입력해주세요"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {renderIndicatorIcon(isValidateOk, isValidateError)}
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <span
            className={cn(
              'text-sm',
              isValidateError && 'text-red-500',
              isValidateOk && 'text-[#2ACF6C]',
              !isTouched && 'text-gray-500',
            )}
          >
            {nickNameStatusMessage}
          </span>
          <span className="text-sm text-gray-500">{lengthIndicator}</span>
        </div>
      </div>

      <button
        disabled={disabled}
        className={cn(
          'w-full h-12 mt-8 text-white',
          'bg-[#2ACF6C] hover:bg-[#2ACF6C]/90',
          'disabled:bg-gray-600 disabled:cursor-not-allowed',
          isProcessing && 'cursor-events-none',
        )}
        onClick={handleSubmit}
      >
        {isProcessing ? (
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
