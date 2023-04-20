import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { APILoginUserProviders } from "@/types/auth";

import authAPI from "@/apis/auth";

const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (providers: APILoginUserProviders) => authAPI.login(providers),
    onSuccess: ({ result }) => {
      console.log(result.accessToken);
      if (result.isNeedAdditionalUserInfo) {
        router.replace("/addNickname");
      }
    },
  });
};

export default useLoginMutation;
