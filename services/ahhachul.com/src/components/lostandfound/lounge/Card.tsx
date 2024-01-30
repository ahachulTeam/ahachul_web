import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "@ahhachul/react-components-layout";

import { ChatSVG } from "~/assets/icons";

function TalkLoungeCard(props: { imgSrc: string }) {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <Box
      as="article"
      style={{
        padding: "18px 0",
        borderBottom: "1px solid #F4F5F8",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Link
        href={!slug ? `/talk/rank/1` : `/talk/1`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <NextImage
          src={props.imgSrc}
          alt=""
          width={100}
          height={100}
          sizes="100vw"
          priority
          style={{
            borderRadius: "8px",
          }}
        />
        <Flex direction="column" gap="16px" style={{ width: "100%" }}>
          <Flex direction="column" gap="6px">
            <Text fontSize="sm" as="p" style={{ fontWeight: 600 }}>
              초록생 지갑을 발견
            </Text>
            <Text fontSize="sm" style={{ color: "#393A3E" }}>
              {
                "개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요"
              }
            </Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex>
              <Text fontSize="sm" as="span" color="gray">
                1분 전
              </Text>
            </Flex>
            <Flex align="center">
              <ChatSVG />
              <Text fontSize="xs" style={{ color: "#7F8088", fontWeight: 500 }}>
                1
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
}

export default TalkLoungeCard;
