import { useQuery } from "@tanstack/react-query";

import { UserModel } from "@/types/user";

import userAPI from "@/apis/users";

const useUserProfileQuery = ({ userId }: { userId: UserModel["userId"] }) => {
  return useQuery(["user", userId], async () => {
    const { data } = await userAPI.getUserProfile({ userId });
    return data;
  });
};

export default useUserProfileQuery;
