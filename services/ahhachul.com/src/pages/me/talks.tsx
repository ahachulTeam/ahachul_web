import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import FilterList from "~/components/talk/lounge/FilterList";
import TalkLoungeList from "~/components/talk/lounge/List";

export default function MeTalksPage() {
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
        centerTitle="작성 내역"
      />
      <main>
        <FilterList
          css={css`
            & > ul:first-of-type {
              border: none !important;
            }
          `}
        />
        <TalkLoungeList />
      </main>
    </Layout>
  );
}
