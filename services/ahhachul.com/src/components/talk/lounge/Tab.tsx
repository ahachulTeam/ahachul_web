import styled from "@emotion/styled";
import { Heading, Box, Flex, Text } from "@ahhachul/react-components-layout";

import { useTab } from "~/hooks/useTab";
import { TALK_TABS as tabList, TALK_TABS_KEYS as tabKeys } from "./static/tab";

function TalkLoungeTab() {
  const { selectedTab, handleChangeTab } = useTab(tabKeys, {
    structureType: "slug",
  });

  return (
    <Box as="section" padding={5}>
      <Heading fontSize="sm" style={{ marginBottom: "20px" }}>
        커뮤니티
      </Heading>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(tabList).map(([key, { label, icon }]) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              aria-selected={selectedTab === key}
              onClick={handleChangeTab(key)}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text as="p" fontSize="sm">
                {label}
              </Text>
            </TabBtn>
          </li>
        ))}
      </Flex>
    </Box>
  );
}

const TabBtn = styled(Flex)`
  cursor: pointer;

  & > span {
    width: max-content;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: #fff;
    padding: 6px;
    transition: background-color 0.2s ease;

    & > svg {
      fill: black;

      & > path {
        fill: black;
        stroke: black;
      }
    }
  }

  & > p {
    transition: font-weight 0.2s ease;
  }

  &[aria-selected="true"] {
    & > span {
      background-color: #2acf6c;

      & > svg {
        fill: white;

        & > path {
          fill: white;
          stroke: white;
        }
      }
    }

    & > p {
      font-weight: 700;
    }
  }
`;

export default TalkLoungeTab;
