import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import { useAppSelector } from 'stores';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.community);
  const flatData = useGetCommunityList({ initPageToken: 0, size: 20, sort: 'answeredAt,asc', categoryType: activeTab });

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        {flatData.map((article) => (
          <TalkLoungeCard key={article.id} article={article} />
        ))}
      </Flex>
    </Box>
  );
}

export default ListSection;
