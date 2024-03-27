import { Box, Flex } from '@ahhachul/react-components-layout';

import LostAndFoundCard from './Item';
import { useGetLostList } from 'queries/lost/useGetLostList';
import { flattenInfinityListData } from 'utils/response';

function ListSection() {
  const { data } = useGetLostList({ page: 1, size: 20, lostType: 'LOST' });

  const flatData = flattenInfinityListData(data);

  console.log('flatData :', flatData);

  return (
    <Box as="section" style={{ padding: '24px 0' }}>
      <Flex as="ul" direction="column" css={ul}>
        <LostAndFoundCard />
        <LostAndFoundCard />
        <LostAndFoundCard />
        <LostAndFoundCard />
        <LostAndFoundCard />
        <LostAndFoundCard />
      </Flex>
    </Box>
  );
}

const ul = {
  '& > li:not(:last-of-type)': {
    borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
  },
};

export default ListSection;
