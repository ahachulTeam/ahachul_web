import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import LoadingModal from "~/components/shared/FullPageLoading";
import ComplaintOverviewList from "~/components/complaints/lounge/OverviewList";

import useModal from "~/components/shared/modal/hooks/useModal";
import { COMPLAINTS_CONTENTS_TYPES } from "~/components/complaints/types/contents";
import { useCallback } from "react";

const 열차번호여부스텝 = dynamic(
  () => import("~/components/complaints/room/열차번호여부스텝"),
  {
    ssr: false,
    loading: ({ isLoading }) => <LoadingModal show={isLoading as boolean} />,
  },
);

export default function ComplaintsLoungePage() {
  const router = useRouter();

  const { handleModalOpen } = useModal();

  const open열차번호여부스텝 = useCallback(
    (slug: COMPLAINTS_CONTENTS_TYPES) => () => {
      handleModalOpen(<열차번호여부스텝 slug={slug} />)();
    },
    [],
  );

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
      <ComplaintOverviewList open열차번호여부스텝={open열차번호여부스텝} />
    </Layout>
  );
}
