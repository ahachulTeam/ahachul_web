import { useMutation } from "@tanstack/react-query";

import { UserModel } from "@/types/user";

import { userAPI } from "@/apis";

export const useVerifyNickname = () =>
  useMutation({
    mutationFn: ({ nickname }: { nickname: UserModel["nickname"] }) =>
      userAPI.verifyMyNickname({ nickname }),
  });
