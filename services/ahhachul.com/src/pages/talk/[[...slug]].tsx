import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Flex } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";
import { Nullable } from "~/models/common";
import {
  SearchSVG,
  BookmarkSVG,
  ShareSVG,
  EllipsisVerticalSVG,
} from "~/assets/icons";

import TalkRoom from "~/components/talk/room/TalkRoom";
import TalkLounge from "~/components/talk/lounge/TalkLounge";

// NOTE!! * Talk Page Structure * //
// ----------------------------------------------------------------
// talk
// talk/rank
// talk/rank/6598387
// ----------------------------------------------------------------
// talk
// talk/free
// talk/free/6598387
// ----------------------------------------------------------------
// talk
// talk/insight
// talk/insight/6598387
// ----------------------------------------------------------------

export interface TalkPageProps {
  slug: Nullable<string | string[]>;
  isRoomService: boolean;
}

export default function TalkPage(props: TalkPageProps) {
  const { slug, isRoomService } = props;
  const router = useRouter();

  const RenderComponent = isRoomService ? (
    <TalkRoom slug={slug} />
  ) : (
    <TalkLounge slug={slug} />
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
        right={
          <HeaderRightComponent type={isRoomService ? "room" : "lounge"} />
        }
      />
      {RenderComponent}
    </Layout>
  );
}

const HeaderRightComponent = ({ type }: { type: "lounge" | "room" }) => (
  <Flex align="center" gap="15px">
    <ResetButton
      ItemComponent={type === "lounge" ? <SearchSVG /> : <ShareSVG />}
      onClick={() => {}}
    />
    <ResetButton
      ItemComponent={
        type === "lounge" ? <BookmarkSVG /> : <EllipsisVerticalSVG />
      }
      onClick={() => {}}
    />
  </Flex>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.query?.slug ?? null;

  const isRoomService = slug && slug?.length >= 2;

  return {
    props: {
      slug,
      isRoomService,
    },
  };
};
