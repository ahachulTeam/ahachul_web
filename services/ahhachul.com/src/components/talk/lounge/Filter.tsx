import { Flex } from "@ahhachul/react-components-layout";
import { vars } from "@ahhachul/themes";

function TalkLoungeFilter() {
  return (
    <Flex
      as="section"
      gap="10px"
      align="center"
      justify="flex-end"
      style={{
        height: "48px",
        paddingRight: "20px",
        borderTop: `1px solid ${vars.colors.$scale.gray[300]}`,
        borderBottom: `1px solid ${vars.colors.$scale.gray[300]}`,
        zIndex: 1,
      }}
    >
      Filter Section
    </Flex>
  );
}

export default TalkLoungeFilter;
