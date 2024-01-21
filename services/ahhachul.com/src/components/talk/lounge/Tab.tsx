import { Heading, Box, Flex } from "@ahhachul/react-components-layout";
import { RankTabSVG } from "./icons";

function TalkLoungeTab() {
  return (
    <Box as="section" padding={5}>
      <Heading fontSize="sm" style={{ marginBottom: "20px" }}>
        커뮤니티
      </Heading>
      <Flex align="center" gap="25px">
        <RankTabSVG />
      </Flex>
    </Box>
  );
}

export default TalkLoungeTab;
