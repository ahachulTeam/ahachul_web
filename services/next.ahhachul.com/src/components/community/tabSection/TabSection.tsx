import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCategoryFree from '@/src/static/icons/community/IconCategoryFree';
import IconCategoryInsight from '@/src/static/icons/community/IconCategoryInsight';
import { TabBtn } from './style';
import { CommunityCategoryType } from '@/src/types';
// import { useAppSelector } from '@/src/stores';
// import { useDispatch } from 'react-redux';
// import { setTab } from '@/src/stores/community';
import IconCategoryRank from '@/src/static/icons/community/IconCategoryRank';
import IconCategoryQuestion from '@/src/static/icons/community/IconCategoryQuestion';

const COMMUNITY_TABS = {
  hot: {
    icon: <IconCategoryRank />,
    label: '인기',
    value: 'HOT',
  },
  free: {
    icon: <IconCategoryFree />,
    label: '자유',
    value: 'FREE',
  },
  insight: {
    icon: <IconCategoryInsight />,
    label: '정보',
    value: 'INSIGHT',
  },
  question: {
    icon: <IconCategoryQuestion />,
    label: '질문',
    value: 'QUESTION',
  },
} as const;

function TabSection() {
  // const dispatch = useDispatch();
  // const { activeTab } = useAppSelector((state) => state.community);

  const handleTab = (key: CommunityCategoryType) => () => {
    console.log('key', key);
    // dispatch(setTab(key));
  };

  return (
    <Box as="section" padding={5} style={{ padding: '0 20px', marginBottom: '16px' }}>
      <Flex as="ul" align="center" gap="25px">
        {Object.entries(COMMUNITY_TABS).map(([key, { label, icon, value }]) => (
          <li key={key} role="none">
            <TabBtn
              gap="6px"
              role="tab"
              as="button"
              align="center"
              direction="column"
              aria-controls={label}
              // aria-selected={value === activeTab}
              onClick={handleTab(value)}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text
                as="p"
                fontSize="sm"
                css={{
                  // color: value === activeTab ? '#c9cedc !important' : '#697183 !important',
                  marginTop: '8px',
                  // fontWeight: value === activeTab ? '600 !important' : 400,
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
