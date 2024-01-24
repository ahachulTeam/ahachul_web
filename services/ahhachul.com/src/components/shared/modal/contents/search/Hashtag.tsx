import { withSuspense } from "@ahhachul/react-hooks-utility";
import { Box } from "@ahhachul/react-components-layout";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import { useHashtagRank } from "./hooks/useHashtagRank";

function HashTagList() {
  const { data: hashtags } = useHashtagRank();
  console.log("hashtags:", hashtags);

  return <div />;
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary>
      <HashTagList />
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
