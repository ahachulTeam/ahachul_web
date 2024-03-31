import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import { useAppSelector } from 'stores';
import { flattenInfinityListData } from 'utils/response';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.community);
  const { data } = useGetCommunityList({ page: 1, size: 20, sort: 'answeredAt,asc', categoryType: activeTab });

  const flatData = flattenInfinityListData(data);

  console.log('flatData :', flatData);

  return (
    <Box as="section" css={{ padding: '24px 0' }}>
      <Flex as="ul" direction="column" css={ul}>
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
      </Flex>
    </Box>
  );
}

export default ListSection;
