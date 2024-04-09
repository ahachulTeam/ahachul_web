import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCircleDown from '@/src/static/icons/lost/IconCircleDown';
import IconCircleUp from '@/src/static/icons/lost/IconCircleUp';
import { TabBtn } from './style';
import { LostType } from '@/src/types';
import { useState } from 'react';

const LOST_AND_FOUND_TABS = {
  ACQUIRE: {
    icon: <IconCircleDown />,
    label: '습득물',
    value: 'ACQUIRE',
  },
  LOST: {
    icon: <IconCircleUp />,
    label: '분실물',
    value: 'LOST',
  },
} as const;

function TabSection() {
  const [activeTab, setTab] = useState(Object.keys(LOST_AND_FOUND_TABS)[0]);

  const handleTab = (key: LostType) => () => {
    setTab(key);
  };

  return (
    <Box as="section" css={{ padding: '0 20px', marginBottom: '16px' }}>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(LOST_AND_FOUND_TABS).map(([key, { label, icon, value }]) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              aria-selected={value === activeTab}
              onClick={handleTab(value)}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text
                as="p"
                fontSize="sm"
                css={{
                  color: value === activeTab ? '#c9cedc !important' : '#697183 !important',
                  marginTop: '8px',
                  fontWeight: value === activeTab ? '600 !important' : 400,
                }}
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
