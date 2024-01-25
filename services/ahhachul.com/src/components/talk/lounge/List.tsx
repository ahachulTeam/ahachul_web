import { withSuspense } from "@ahhachul/react-hooks-utility";
import { Box, Flex } from "@ahhachul/react-components-layout";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import TalkLoungeCard from "./Card";
// import useTalkLounge from "./hooks/useTalkLounge";

import DUMMY_IMG_1 from "public/dummy-img-1.png";

import DUMMY_IMG_2 from "public/dummy-img-2.png";

import DUMMY_IMG_3 from "public/dummy-img-3.png";

import DUMMY_IMG_4 from "public/dummy-img-4.png";

function TalkLounge() {
  // const { data } = useTalkLounge();
  // console.log("data :", data);

  return (
    <Box as="section" background="gray" style={{ padding: "22px 20px" }}>
      <Flex as="ul" direction="column" gap="20px">
        <li>
          <TalkLoungeCard imgSrc={DUMMY_IMG_1.src} />
        </li>
        <li>
          <TalkLoungeCard imgSrc={DUMMY_IMG_4.src} />
        </li>
        <li>
          <TalkLoungeCard imgSrc={DUMMY_IMG_2.src} />
        </li>
        <li>
          <TalkLoungeCard imgSrc={DUMMY_IMG_3.src} />
        </li>
      </Flex>
    </Box>
  );
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary>
      <TalkLounge />
    </ErrorBoundary>
  );
}

export function ListSkeleton() {
  return (
    <Box as="section" background="gray" style={{ padding: "22px 20px" }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </Box>
  );
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <ListSkeleton />,
});
