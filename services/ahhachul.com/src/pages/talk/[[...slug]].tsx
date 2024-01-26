import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Flex } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";
import {
  SearchSVG,
  BookmarkSVG,
  ShareSVG,
  EllipsisVerticalSVG,
} from "~/assets/icons";

import TalkRoom from "~/components/talk/room/TalkRoom";
import TalkLounge from "~/components/talk/lounge/TalkLounge";

import useModal from "~/components/shared/modal/hooks/useModal";

const SearchModal = dynamic(
  () => import("~/components/shared/modal/contents/search/SearchModal"),
  { ssr: false },
);
const SavedModal = dynamic(
  () => import("~/components/shared/modal/contents/Saved"),
  { ssr: false },
);

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
  isRoomService: boolean;
}

export default function TalkPage(props: TalkPageProps) {
  const { isRoomService } = props;
  const router = useRouter();

  const RenderComponent = isRoomService ? <TalkRoom /> : <TalkLounge />;

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

const HeaderRightComponent = ({ type }: { type: "lounge" | "room" }) => {
  // TOOD: MODAL_PRESET_SLUGS 분기 처리
  const { handleModalOpen } = useModal();

  const openSearchModal = () => {
    handleModalOpen(<SearchModal />)();
  };

  const openSavedModal = () => {
    handleModalOpen(<SavedModal />)();
  };

  return (
    <Flex align="center" gap="15px">
      <ResetButton
        ItemComponent={type === "lounge" ? <SearchSVG /> : <ShareSVG />}
        onClick={openSearchModal}
      />
      <ResetButton
        ItemComponent={
          type === "lounge" ? <BookmarkSVG /> : <EllipsisVerticalSVG />
        }
        onClick={openSavedModal}
      />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.query?.slug ?? null;
  const isRoomService = slug && slug?.length >= 2;

  return {
    props: {
      isRoomService,
    },
  };
};