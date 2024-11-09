'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { updateUser } from '../../my/_lib/updateUser';
import { type TemporaryUserAuthData } from '@/store/auth';
import { AuthService } from '@/common/service/AuthService';

export const useUpdateUser = (
  auth: TemporaryUserAuthData | null,
  removeTemporaryAuth: () => void,
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (!auth) return;
      const { accessToken, refreshToken } = auth;
      AuthService.setToken(accessToken, refreshToken);
      removeTemporaryAuth();
      router.replace('/');
    },
  });
};
