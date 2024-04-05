import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
// import { useMemo } from 'react';
import { useAppSelector } from 'stores';
// import { ILostList } from 'types';
// import { flattenInfinityListData } from 'utils/response';
// import { flattenInfinityListData } from 'utils/response';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.community);
  const { data } = useGetCommunityList({ page: 1, size: 20, sort: 'answeredAt,asc', categoryType: activeTab });

  console.log('data:', data);

  // const flatData = flattenInfinityListData<ILostList>(data);

  // console.log('flatData :', flatData);

  // const flatData = useMemo(() => (data ? data.pages.flatMap((data) => data.result.posts) : []), [data]);

  // console.log('flatData :', flatData);

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
