import { useMutation } from "@tanstack/react-query";

import { APIUser } from "@/types/user";

import userAPI from "@/apis/users";

const useMyProfileMutation = () =>
  useMutation(({ nickname }: { nickname: APIUser["nickname"] }) =>
    userAPI.updateMyProfile({ nickname }).then(({ data }) => data)
  );

export default useMyProfileMutation;
