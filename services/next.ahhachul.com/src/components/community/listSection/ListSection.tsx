import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from '@/src/queries/community/useGetCommunityList';
import TalkLoungeCard from './Item';
import { ul } from './style';

function ListSection() {
  const flatData = useGetCommunityList({ page: 0, size: 20, sort: 'createdAt,desc', categoryType: 'FREE' });

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        {flatData.map((article) => (
          <li key={article.id}>
            <TalkLoungeCard article={article} />
          </li>
        ))}
      </Flex>
    </Box>
  );
}

export default ListSection;
