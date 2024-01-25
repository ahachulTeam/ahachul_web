import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ComplaintOverviewList from "~/components/complaints/lounge/OverviewList";

export default function ComplaintsLoungePage() {
  const router = useRouter();

  return (
    <Layout
      footer={false}
      css={{ width: "100vw", height: "100vh", backgroundColor: "#242424" }}
    >
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        centerTitle="민원"
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
      <ComplaintOverviewList />
    </Layout>
  );
}
