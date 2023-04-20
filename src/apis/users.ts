import { UserModel } from "@/types/user";

import { ax } from "./axios";

const userAPI = {
  getUserProfile: ({ userId }: { userId: UserModel["userId"] }) =>
    ax.get<UserModel>(`/users/${userId}/profile`),
  getMyProfile: () => ax.get<UserModel>("/users/me"),
  updateMyProfile: ({ nickname }: { nickname: UserModel["nickname"] }) =>
    ax.put<UserModel>("/users/profile", { nickname }),
};

export default userAPI;
