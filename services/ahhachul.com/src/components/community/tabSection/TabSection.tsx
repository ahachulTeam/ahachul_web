import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { useDispatch } from 'react-redux';
import IconCategoryFree from 'static/icons/community/IconCategoryFree';
import IconCategoryInsight from 'static/icons/community/IconCategoryInsight';
import { showModal } from 'stores/ui/reducer';
import { theme } from 'styles';
import { TabBtn } from './style';

const COMMUNITY_TABS = {
  free: {
    icon: <IconCategoryFree />,
    label: '자유',
  },
  insight: {
    icon: <IconCategoryInsight />,
    label: '정보',
  },
};

function TabSection() {
  const dispatch = useDispatch();
  const handleModalOpen = () => dispatch(showModal());

  return (
    <Box as="section" padding={5} background={theme.color.static.dark.gray[200]}>
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
              onClick={handleModalOpen}
            >
              <Flex as="span" justify="center" align="center">
                {icon}
              </Flex>
              <Text
                as="p"
                fontSize="sm"
                css={{ color: idx === 0 ? '#c9cedc !important' : '#697183 !important', marginTop: '8px' }}
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
