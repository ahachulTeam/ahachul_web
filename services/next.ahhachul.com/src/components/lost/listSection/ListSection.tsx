import React from 'react';
import { useParams } from 'next/navigation';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { UiComponent } from '@/src/components';
import { flattenInfinityListData } from '@/src/utils/response';
import { useGetLostList } from '@/src/queries/lost/useGetLostList';

import LostCard from './Item';
import { ul } from './style';
import { useRouter } from 'next/router';
import { LostType } from '@/src/types';

function ListSection() {
  const params = useParams();
  const { query } = useRouter();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetLostList({
    page: 0,
    size: 20,
    hashTag: query?.tag as string,
    keyword: query?.keyword as string,
    lostType: (query?.lostType as LostType) || 'ACQUIRE',
    ...(params?.subwayLineId?.[0] && { subwayLineId: params?.subwayLineId?.[0] as string }),
  });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <li key={article.id}>
              <LostCard article={article} />
            </li>
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
