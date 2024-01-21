import { Flex } from "@ahhachul/react-components-layout";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";
import { SearchSVG, BookmarkSVG } from "~/assets/icons";

import TalkLoungeTab from "~/components/talk/lounge/Tab";
import TalkLoungeFilter from "~/components/talk/lounge/Filter";
import TalkLoungeList from "~/components/talk/lounge/List";

export default function TalkLoungePage() {
  const router = useRouter();

  const HeaderRightComponent = (
    <Flex align="center" gap="15px">
      <ResetButton ItemComponent={<SearchSVG />} onClick={() => {}} />
      <ResetButton ItemComponent={<BookmarkSVG />} onClick={() => {}} />
    </Flex>
  );

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        right={HeaderRightComponent}
      />
      <main>
        <TalkLoungeTab />
        <TalkLoungeFilter />
        <TalkLoungeList />
      </main>
    </Layout>
  );
}
