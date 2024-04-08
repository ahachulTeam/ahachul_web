import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { UiComponent } from '@/src/components';
import { useAppSelector } from '@/src/stores';
import { flattenInfinityListData } from '@/src/utils/response';
import { useGetLostList } from '@/src/queries/lost/useGetLostList';

import LostCard from './Item';
import { ul } from './style';

function ListSection() {
  // const { activeTab } = useAppSelector((state) => state.lost);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetLostList({
    page: 0,
    size: 20,
    lostType: 'ACQUIRE',
  });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <LostCard key={article.id} article={article} />
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
