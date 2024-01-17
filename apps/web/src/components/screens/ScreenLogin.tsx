import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect } from "react";

import PageTemplate from "../public/PageTemplate";
import { useLoginMutation } from "@/services";
import { APILoginUserProviders } from "@/types/auth";

function RedirectForLoginScreen() {
  const { query } = useRouter();
  const providerCode = query?.code;
  const providerType = query?.type;

  const { mutate: mutateLogin } = useLoginMutation();

  useEffect(() => {
    if (Boolean(providerCode) && Boolean(providerType)) {
      mutateLogin({
        providerCode,
        providerType,
      } as APILoginUserProviders);
    }
  }, [providerCode, providerType, mutateLogin]);

  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        <Redirect />
      </PageTemplate.ContentsSection>
    </PageTemplate>
  );
}

const Redirect = styled.div`
  background-image: url("/illust/onboding/_3.svg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 530px;
  height: 324px;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  /* animation: 1000ms cubic-bezier(0.16, 1, 0.3, 1); */
  will-change: transform, opacity;
`;

export default RedirectForLoginScreen;
