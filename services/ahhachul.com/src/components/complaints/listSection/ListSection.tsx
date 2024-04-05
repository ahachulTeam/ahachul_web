import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import ComplaintCard from './Item';
import { ul } from './style';

function ListSection() {
  const { data } = useGetCommunityList({ page: 1, size: 20, sort: 'answeredAt,asc', categoryType: 'FREE' });

  console.log('data:', data);

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        <ComplaintCard trainNo={'1929'} />
        <ComplaintCard trainNo={'3927'} />
        <ComplaintCard trainNo={'D3223'} />
        <ComplaintCard trainNo={'UL3203'} />
        <ComplaintCard trainNo={'7302'} />
        <ComplaintCard trainNo={'5849'} />
        <ComplaintCard trainNo={'3932'} />
        <ComplaintCard trainNo={'2738'} />
        <ComplaintCard trainNo={'321940'} />
        <ComplaintCard trainNo={'371293'} />
        <ComplaintCard trainNo={'361403'} />
        <ComplaintCard trainNo={'8128'} />
        <ComplaintCard trainNo={'1493'} />
        <ComplaintCard trainNo={'6489'} />
        <ComplaintCard trainNo={'2238'} />
      </Flex>
    </Box>
  );
}

export default ListSection;
