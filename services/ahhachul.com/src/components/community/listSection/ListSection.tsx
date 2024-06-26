import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetCommunityList } from 'queries/community/useGetCommunityList';
import { useAppSelector } from 'stores';
import TalkLoungeCard from './Item';
import { ul } from './style';
import { flattenInfinityListData } from 'utils/response';
import { UiComponent } from 'components';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.community);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetCommunityList({
    page: 0,
    size: 20,
    sort: 'answeredAt,asc',
    categoryType: activeTab,
  });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <TalkLoungeCard key={article.id} article={article} />
          ))}
        </Flex>
      </Box>
      {hasNextPage && (
        <UiComponent.VisibilityLoader
          callback={() => {
            !isFetchingNextPage && fetchNextPage();
          }}
        />
      )}
    </>
  );
}

export default ListSection;
