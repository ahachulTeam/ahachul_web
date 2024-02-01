import { css } from "@emotion/react";

import Layout from "~/components/shared/Layout";
import Header from "~/components/shared/Header";

export default function ChatPage() {
  return (
    <Layout footer={false}>
      <Header
        left={<Header.HeaderLeft contentsType="go-back" onClick={() => {}} />}
        centerTitle="USERNAME"
        css={css`
          background-color: #242424;

          & > h1 {
            color: #fff !important;
          }

          & > button > svg > path {
            stroke: #fff;
          }
        `}
      />
      <div />
    </Layout>
  );
}
