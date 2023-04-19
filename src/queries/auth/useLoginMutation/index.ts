import { useMutation } from "@tanstack/react-query";

import authAPI, { APILoginProviders } from "@/apis/auth";

const useLoginMutation = () =>
  useMutation((providers: APILoginProviders) =>
    authAPI.login(providers).then(({ data }) => {
      console.log(data);
      return data;
    })
  );

export default useLoginMutation;
