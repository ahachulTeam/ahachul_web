import { withSuspense } from "@ahhachul/react-hooks-utility";
import { Box, Flex } from "@ahhachul/react-components-layout";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LostAndFoundCard from "./Card";
// import useTalkLounge from "./hooks/useTalkLounge";

import DUMMY_IMG from "public/dummy-img-6.png";

function LostAndFoundList() {
  // const { data } = useTalkLounge();
  // console.log("data :", data);

  return (
    <Box as="section" style={{ padding: "10px 20px" }}>
      <Flex as="ul" direction="column">
        <li>
          <LostAndFoundCard imgSrc={DUMMY_IMG.src} />
        </li>
        <li>
          <LostAndFoundCard imgSrc={DUMMY_IMG.src} />
        </li>
        <li>
          <LostAndFoundCard imgSrc={DUMMY_IMG.src} />
        </li>
        <li>
          <LostAndFoundCard imgSrc={DUMMY_IMG.src} />
        </li>
      </Flex>
    </Box>
  );
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary>
      <LostAndFoundList />
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
