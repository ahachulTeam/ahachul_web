import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { UiComponent } from '@/src/components';
import { useGetCommunityList } from '@/src/queries/community/useGetCommunityList';
import { flattenInfinityListData } from '@/src/utils/response';
import TalkLoungeCard from './Item';
import { ul } from './style';
import { useRouter } from 'next/router';
import { CommunityCategoryType } from '@/src/types';
import { useParams } from 'next/navigation';

function ListSection() {
  const params = useParams();
  const { query } = useRouter();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetCommunityList({
    page: 0,
    size: 20,
    sort: 'createdAt,desc',
    hashTag: query?.tag as string,
    content: query?.keyword as string,
    categoryType: (query?.categoryType as CommunityCategoryType) || 'HOT',
    ...(params?.subwayLineId?.[0] && { subwayLineId: params?.subwayLineId?.[0] as string }),
  });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <li key={article.id}>
              <TalkLoungeCard article={article} />
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
