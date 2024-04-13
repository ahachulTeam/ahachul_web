import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { UiComponent } from '@/src/components';
import { useGetCommunityList } from '@/src/queries/community/useGetCommunityList';
import { flattenInfinityListData } from '@/src/utils/response';
import TalkLoungeCard from './Item';
import { ul } from './style';
import { useRouter } from 'next/router';
import { CommunityCategoryType } from '@/src/types';

function ListSection() {
  const { query } = useRouter();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetCommunityList({
    page: 0,
    size: 20,
    sort: 'createdAt,desc',
    content: query?.keyword as string,
    hashTag: (query?.tag as string)?.replace('#', ''),
    categoryType: (query?.categoryType as CommunityCategoryType) || 'HOT',
  });
  console.log('hashtag:', (query?.tag as string)?.replace('#', ''));
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
