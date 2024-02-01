import { withSuspense } from "@ahhachul/react-hooks-utility";
import { Flex, Text, Box } from "@ahhachul/react-components-layout";

import Skeleton from "~/components/shared/Skeleton";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import { useHashtagRank } from "./hooks/useHashtagRank";
import { PolygonUpSVG, PolygonDownSVG } from "~/assets/icons";

function HashTagList() {
  const { data: hashtags } = useHashtagRank();
  console.log("hashtags:", hashtags);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginTop: "15px",
          height: "40px",
          padding: "0 20px",
          width: "100%",
        }}
      >
        <Text
          fontSize="md"
          style={{
            fontWeight: 700,
          }}
        >
          인기 검색어
        </Text>
      </Flex>
      <Flex direction="column" style={{ padding: "0 20px" }}>
        <Flex
          align="center"
          gap="16px"
          style={{ height: "50px", position: "relative" }}
        >
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: "16px" }}>
            1
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <PolygonUpSVG
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </Flex>
        <Flex
          align="center"
          gap="16px"
          style={{ height: "50px", position: "relative" }}
        >
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: "16px" }}>
            2
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <PolygonDownSVG
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </Flex>
        <Flex
          align="center"
          gap="16px"
          style={{ height: "50px", position: "relative" }}
        >
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: "16px" }}>
            3
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <PolygonUpSVG
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </Flex>
        <Flex
          align="center"
          gap="16px"
          style={{ height: "50px", position: "relative" }}
        >
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: "16px" }}>
            4
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <PolygonDownSVG
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </Flex>
        <Flex
          align="center"
          gap="16px"
          style={{ height: "50px", position: "relative" }}
        >
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: "16px" }}>
            5
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <PolygonUpSVG
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </Flex>
      </Flex>
    </>
  );
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
