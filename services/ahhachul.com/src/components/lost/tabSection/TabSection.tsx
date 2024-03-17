import { Heading, Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCircleDown from 'static/icons/lost/IconCircleDown';
import IconCircleUp from 'static/icons/lost/IconCircleUp';
import { TabBtn } from './style';

const LOST_AND_FOUND_TABS = {
  acquire: {
    icon: <IconCircleDown />,
    label: '습득물',
  },
  lost: {
    icon: <IconCircleUp />,
    label: '분실물',
  },
};

function TabSection() {
  return (
    <Box as="section" padding={5}>
      <Heading fontSize="sm" style={{ marginBottom: '20px', color: 'white' }}>
        분실물 센터
      </Heading>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(LOST_AND_FOUND_TABS).map(([key, { label, icon }], idx) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              aria-selected={idx === 0}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text as="p" fontSize="sm" style={{ color: 'white' }}>
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
