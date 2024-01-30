import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "@ahhachul/react-components-layout";

import ResetButton from "~/components/shared/ResetButton";
import { BookmarkFillSVG, CommentSVG, EyeSVG, HeartSVG } from "~/assets/icons";

function TalkLoungeCard(props: { imgSrc: string }) {
  const router = useRouter();

  const hasImage = false;
  const slug = router.query.slug;

  return (
    <Box
      as="article"
      background="gray"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
      }}
    >
      <Link
        href={!slug ? `talk/rank/1` : `talk/1`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          padding: "22px",
          borderBottom: "1px solid #F4F5F8",
        }}
      >
        <Flex align="center">
          <Text fontSize="sm" as="p" color="gray" style={{ fontWeight: 700 }}>
            🔥 자유
          </Text>
        </Flex>
        {hasImage && (
          <NextImage
            src={props.imgSrc}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "172px",
              overflow: "hidden",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        )}
        <Flex direction="column" gap="14px">
          <Flex direction="column">
            <Text
              fontSize="sm"
              as="p"
              style={{ fontWeight: 700, marginBottom: "6px" }}
            >
              고졸로 1년만에 개발자고졸로 1년만에 개발자고졸로 ...
            </Text>
            <Text fontSize="sm" as="pre" style={{ marginBottom: "8px" }}>
              {
                "개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요"
              }
            </Text>
            <Text fontSize="sm" as="p">
              ...더보기
            </Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text fontSize="sm" as="span" color="gray">
              #해시태그
            </Text>
            <Text fontSize="sm" as="span" color="gray">
              00시간전
            </Text>
          </Flex>
        </Flex>
      </Link>
      <Flex
        align="center"
        justify="space-between"
        style={{ height: "56px", padding: "0 30px" }}
      >
        <Flex align="center" gap="12px">
          <ResetButton
            ItemComponent={
              <Flex align="center" gap="2px">
                <EyeSVG width={20} height={20} />
                <Text fontSize="sm">1</Text>
              </Flex>
            }
            onClick={() => {}}
          />
          <ResetButton
            ItemComponent={
              <Flex align="center" gap="2px">
                <HeartSVG width={20} height={20} />
                <Text fontSize="sm">1</Text>
              </Flex>
            }
            onClick={() => {}}
          />
          <ResetButton
            ItemComponent={
              <Flex align="center" gap="2px">
                <CommentSVG width={20} height={20} />
                <Text fontSize="sm">1</Text>
              </Flex>
            }
            onClick={() => {}}
          />
        </Flex>
        <ResetButton ItemComponent={<BookmarkFillSVG />} onClick={() => {}} />
      </Flex>
    </Box>
  );
}

export default TalkLoungeCard;
