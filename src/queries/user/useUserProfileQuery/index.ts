import { useQuery } from "@tanstack/react-query";

import { UserModel } from "@/types/user";

import userAPI from "@/apis/users";

const useUserProfileQuery = ({ memberId }: { memberId: UserModel["memberId"] }) => {
  return useQuery(["user", memberId], async () => {
    const res = await userAPI.getUserProfile({ memberId });
    return res;
  });
};

export default useUserProfileQuery;
