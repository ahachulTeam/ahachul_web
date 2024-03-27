import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import { flattenInfinityListData } from 'utils/response';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const { data } = useGetCommunityList({ page: 1, size: 20, sort: 'answeredAt,asc' });

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
