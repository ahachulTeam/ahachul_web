import React from 'react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCategoryFree from '@/src/static/icons/community/IconCategoryFree';
import IconCategoryInsight from '@/src/static/icons/community/IconCategoryInsight';
import { TabBtn } from './style';
import { CommunityCategoryType } from '@/src/types';
import IconCategoryRank from '@/src/static/icons/community/IconCategoryRank';
import IconCategoryQuestion from '@/src/static/icons/community/IconCategoryQuestion';
import { useRouter } from 'next/router';

const COMMUNITY_TABS = {
  HOT: {
    icon: <IconCategoryRank />,
    label: '인기',
    value: 'HOT',
  },
  FREE: {
    icon: <IconCategoryFree />,
    label: '자유',
    value: 'FREE',
  },
  INSIGHT: {
    icon: <IconCategoryInsight />,
    label: '정보',
    value: 'INSIGHT',
  },
  QUESTION: {
    icon: <IconCategoryQuestion />,
    label: '질문',
    value: 'QUESTION',
  },
} as const;

function TabSection() {
  const router = useRouter();
  const asPath = router.asPath.split('?');
  const activeTab = router.query?.categoryType || Object.keys(COMMUNITY_TABS)[0];

  const handleTab = (categoryType: CommunityCategoryType) => () => {
    router.push(`${asPath[0]}?categoryType=${categoryType}`, undefined, {
      shallow: true,
    });
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
