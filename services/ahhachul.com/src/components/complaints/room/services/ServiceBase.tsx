import { Box, Flex, Text } from "@ahhachul/react-components-layout";

import ResetButton from "~/components/shared/ResetButton";
import { PhoneSVG } from "~/assets/icons";
import { COMPLAINTS_CONTENTS_TYPES } from "../../types/contents";
import { COMPLAINTS_ROOM_SERVICE_INFO } from "../../static/contents";

function ServiceBase(props: {
  page: COMPLAINTS_CONTENTS_TYPES;
  children: React.ReactNode;
}) {
  const { page, children } = props;

  return (
    <Box style={{ padding: "68px 20px 24px" }}>
      <Flex direction="column" gap="4px" style={{ marginBottom: "24px" }}>
        <Text fontSize="md" style={{ color: "#171717", fontWeight: 600 }}>
          {COMPLAINTS_ROOM_SERVICE_INFO[page].title}
        </Text>
        <Text fontSize="sm" style={{ color: "#7B7B7B" }}>
          {COMPLAINTS_ROOM_SERVICE_INFO[page].subTitle}
        </Text>
      </Flex>
      {children}
      <Flex
        as="button"
        align="center"
        style={{
          width: "100%",
          borderRadius: "10px",
          height: "46px",
          padding: "0 20px",
          marginTop: "24px",
          backgroundColor: "#F6F7F9",
        }}
      >
        <ResetButton ItemComponent={<PhoneSVG />} onClick={() => {}} />
        <Text fontSize="sm" style={{ color: "#000" }}>
          콜센터로 바로 연결하기
        </Text>
      </Flex>
    </Box>
  );
}

export default ServiceBase;
