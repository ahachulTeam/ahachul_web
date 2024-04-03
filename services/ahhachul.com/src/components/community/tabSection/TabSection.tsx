import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCategoryFree from 'static/icons/community/IconCategoryFree';
import IconCategoryInsight from 'static/icons/community/IconCategoryInsight';
import { theme } from 'styles';
import { TabBtn } from './style';
import { CommunityCategoryType } from 'types';
import { useAppSelector } from 'stores';
import { useDispatch } from 'react-redux';
import { setTab } from 'stores/community';

const COMMUNITY_TABS = {
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
} as const;

function TabSection() {
  const dispatch = useDispatch();
  const { activeTab } = useAppSelector((state) => state.community);

  const handleTab = (key: CommunityCategoryType) => () => {
    dispatch(setTab(key));
  };

  return (
    <Box as="section" padding={5} background={theme.color.static.dark.gray[200]}>
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
