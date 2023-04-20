import { useMutation } from "@tanstack/react-query";

import authAPI, { APILoginProviders } from "@/apis/auth";

const useLoginMutation = () =>
  useMutation((providers: APILoginProviders) => authAPI.login(providers));

export default useLoginMutation;
