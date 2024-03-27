import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { useState } from 'react';
import IconCircleDown from 'static/icons/lost/IconCircleDown';
import IconCircleUp from 'static/icons/lost/IconCircleUp';
import { TabBtn } from './style';
import { KeyOf } from 'types';

const LOST_AND_FOUND_TABS = {
  acquire: {
    icon: <IconCircleDown />,
    label: '습득물',
  },
  lost: {
    icon: <IconCircleUp />,
    label: '분실물',
  },
} as const;

type LostAndFoundTabsType = typeof LOST_AND_FOUND_TABS;

function TabSection() {
  const [activeTab, setActiveTab] = useState(Object.keys(LOST_AND_FOUND_TABS)[0]);

  const handleTab = (key: KeyOf<LostAndFoundTabsType>) => () => {
    setActiveTab(key);
  };

  return (
    <Box as="section" padding={5}>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(LOST_AND_FOUND_TABS).map(([key, { label, icon }]) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              aria-selected={key === activeTab}
              onClick={handleTab(key as KeyOf<LostAndFoundTabsType>)}
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
