import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const { data } = useGetCommunityList({ page: 1, size: 20, sort: 'answeredAt,asc', categoryType: 'FREE' });

  console.log('data:', data);

  return (
    <Box as="section">
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
