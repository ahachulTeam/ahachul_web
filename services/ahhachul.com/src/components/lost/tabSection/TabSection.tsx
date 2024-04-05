import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconCircleDown from 'static/icons/lost/IconCircleDown';
import IconCircleUp from 'static/icons/lost/IconCircleUp';
import { TabBtn } from './style';
import { LostType } from 'types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'stores';
import { setTab } from 'stores/lost';

const LOST_AND_FOUND_TABS = {
  acquire: {
    icon: <IconCircleDown />,
    label: '습득물',
    value: 'ACQUIRE',
  },
  lost: {
    icon: <IconCircleUp />,
    label: '분실물',
    value: 'LOST',
  },
} as const;

function TabSection() {
  const dispatch = useDispatch();
  const { activeTab } = useAppSelector((state) => state.lost);

  const handleTab = (key: LostType) => () => {
    dispatch(setTab(key));
  };

  return (
    <Box as="section" padding={5}>
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
