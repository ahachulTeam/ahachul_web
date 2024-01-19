// @ts-ignore
import { useSession } from "next-auth/react";

import { User } from "@/models/user";

function useUser() {
  const { data } = useSession();

  return data == null ? null : (data.user as User);
}

export default useUser;
