import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCategoryFree from 'static/icons/community/IconCategoryFree';
import IconCategoryInsight from 'static/icons/community/IconCategoryInsight';
import { theme } from 'styles';
import { TabBtn } from './style';
import { KeyOf } from 'types';
import { useState } from 'react';

const COMMUNITY_TABS = {
  free: {
    icon: <IconCategoryFree />,
    label: '자유',
  },
  insight: {
    icon: <IconCategoryInsight />,
    label: '정보',
  },
} as const;

type CommunityTabsType = typeof COMMUNITY_TABS;

function TabSection() {
  const [activeTab, setActiveTab] = useState(Object.keys(COMMUNITY_TABS)[0]);

  const handleTab = (key: KeyOf<CommunityTabsType>) => () => {
    setActiveTab(key);
  };

  return (
    <Box as="section" padding={5} background={theme.color.static.dark.gray[200]}>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(COMMUNITY_TABS).map(([key, { label, icon }]) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              aria-selected={key === activeTab}
              onClick={handleTab(key as KeyOf<CommunityTabsType>)}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text
                as="p"
                fontSize="sm"
                css={{ color: key === activeTab ? '#c9cedc !important' : '#697183 !important', marginTop: '8px' }}
              >
                {label}
              </Text>
            </TabBtn>
          </li>
        ))}
      </Flex>
    </Box>
  );
}

export default TabSection;
