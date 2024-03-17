import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCategoryFree from 'static/icons/community/IconCategoryFree';
import IconCategoryInsight from 'static/icons/community/IconCategoryInsight';
import IconCategoryRank from 'static/icons/community/IconCategoryRank';
import { TabBtn } from './style';

const COMMUNITY_TABS = {
  rank: {
    icon: <IconCategoryRank />,
    label: '인기글',
  },
  free: {
    icon: <IconCategoryFree />,
    label: '자유게시판',
  },
  insight: {
    icon: <IconCategoryInsight />,
    label: '정보',
  },
};

function TabSection() {
  return (
    <Box as="section" padding={5}>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(COMMUNITY_TABS).map(([key, { label, icon }], idx) => (
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
              <Text as="p" fontSize="sm" css={{ color: 'white !important' }}>
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
