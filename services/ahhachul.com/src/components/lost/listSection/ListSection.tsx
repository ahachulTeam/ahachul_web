import { Box, Flex } from '@ahhachul/react-components-layout';

import LostCard from './Item';
import { useGetLostList } from 'queries/lost/useGetLostList';
// import { flattenInfinityListData } from 'utils/response';
import { useAppSelector } from 'stores';
import { ul } from './style';
// import { ILostList } from 'types';
// import { useMemo } from 'react';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.lost);
  const { data } = useGetLostList({ page: 1, size: 20, lostType: activeTab });

  // const flatData = flattenInfinityListData<ILostList>(data);

  // const flatData = useMemo(() => (data ? data.pages.flatMap(({ data }) => data?.result?.posts) : []), [data]);

  console.log('data :', data);

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        <LostCard />
        <LostCard />
        <LostCard />
        <LostCard />
        <LostCard />
        <LostCard />
      </Flex>
    </Box>
  );
}

export default ListSection;
