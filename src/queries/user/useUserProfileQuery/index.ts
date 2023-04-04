import { useQuery } from "@tanstack/react-query";

import { APIUser } from "@/types/user";

import userAPI from "@/apis/users";

const useUserProfileQuery = ({ userId }: { userId: APIUser["userId"] }) => {
  return useQuery(["user", userId], async () => {
    const { data } = await userAPI.getUserProfile({ userId });
    return data;
  });
};

export default useUserProfileQuery;
