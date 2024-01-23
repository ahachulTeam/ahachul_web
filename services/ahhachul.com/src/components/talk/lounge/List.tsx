import { css } from "@emotion/react";

import { Box, OrderedList } from "@ahhachul/react-components-layout";
import { withSuspense } from "@ahhachul/react-hooks-utility";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import TalkLoungeCard from "./Card";

function TalkLoungeList() {
  return (
    <Box as="section" background="gray" style={{ padding: "22px 20px" }}>
      <OrderedList spacing={5}>
        <li
          css={css`
            &::marker {
              color: #edf2f7;
            }
          `}
        >
          <TalkLoungeCard />
        </li>
      </OrderedList>
    </Box>
  );
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary>
      <TalkLoungeList />
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
