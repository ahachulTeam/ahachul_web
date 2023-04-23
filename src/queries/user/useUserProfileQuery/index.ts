import { useQuery } from "@tanstack/react-query";

import { UserModel } from "@/types/user";

import userAPI from "@/apis/users";

const useUserProfileQuery = ({ memberId }: { memberId: UserModel["memberId"] }) => {
  return useQuery(["user", memberId], async () => {
    const { data } = await userAPI.getUserProfile({ memberId });
    return data;
  });
};

export default useUserProfileQuery;
