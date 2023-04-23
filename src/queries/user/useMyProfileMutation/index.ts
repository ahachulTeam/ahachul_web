import { useMutation } from "@tanstack/react-query";

import { UserModel } from "@/types/user";

import userAPI from "@/apis/users";

const useMyProfileMutation = () =>
  useMutation(({ nickname }: { nickname: UserModel["nickname"] }) =>
    userAPI.updateMyProfile({ nickname })
  );

export default useMyProfileMutation;
