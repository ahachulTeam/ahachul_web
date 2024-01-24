import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Box, Flex, Text, Heading } from "@ahhachul/react-components-layout";

function TalkLoungeFancyCard() {
  const router = useRouter();
  const slug = router.query.slug;
  const pathname = usePathname();

  return (
    <Box as="section" padding={5}>
      <Heading fontSize="sm" style={{ marginBottom: "20px" }}>
        이시간 인기글
      </Heading>
      <Box
        as="article"
        style={{
          background: "linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)",
          borderRadius: "10px",
        }}
      >
        <Link
          href={!slug ? `${pathname}/rank/1` : `${pathname}/1`}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "15px 18px",
          }}
        >
          <Flex align="center">
            <Text
              fontSize="sm"
              as="p"
              color="whiteAlpha"
              style={{ fontWeight: 700, marginBottom: "6px" }}
            >
              🔥 자유
            </Text>
          </Flex>
          <Flex direction="column">
            <Text
              fontSize="md"
              as="p"
              color="whiteAlpha"
              style={{ fontWeight: 700, marginBottom: "6px" }}
            >
              고졸로 1년만에 개발자고졸로 1년만에 개발자고졸로 ...
            </Text>
            <Text
              fontSize="sm"
              as="pre"
              color="whiteAlpha"
              style={{ marginBottom: "8px" }}
            >
              {
                "개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요"
              }
            </Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text fontSize="sm" as="span" color="whiteAlpha">
              #해시태그 #해시태그 #해시태그
            </Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}

export default TalkLoungeFancyCard;
