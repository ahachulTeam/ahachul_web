import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Flex } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import FilterList from "~/components/talk/lounge/FilterList";

export default function MeLostAndFoundPage() {
  const router = useRouter();

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        centerTitle="유실물 내역"
      />
      <main>
        <FilterList
          css={css`
            & > ul:first-of-type {
              border: none !important;
            }
          `}
        />
        <Flex style={{ padding: "0 20px" }}>유실물 글 내역 페이지</Flex>
      </main>
    </Layout>
  );
}
