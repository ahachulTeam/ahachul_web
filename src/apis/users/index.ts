import { ax } from "../axios";

import { APIUser } from "@/types/user";

const userAPI = {
  getUserProfile: ({ userId }: { userId: APIUser["userId"] }) =>
    ax.get<APIUser>(`/users/${userId}/profile`),
  getMyProfile: () => ax.get<APIUser>("/users/me"),
  updateMyProfile: ({ nickname }: { nickname: APIUser["nickname"] }) =>
    ax.put<APIUser>("/users/profile", { nickname }),
};

export default userAPI;
