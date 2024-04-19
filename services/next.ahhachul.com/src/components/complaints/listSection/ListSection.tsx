import { useParams } from 'next/navigation';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { useGetComplaintList } from '@/src/queries/complaints/useGetComplaintList';
import { flattenInfinityListData } from '@/src/utils/response';
import { UiComponent } from '@/src/components';
import ComplaintCard from './Item';
import { ul } from './style';

function ListSection() {
  const params = useParams();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetComplaintList({ page: 0, size: 20,
    ...(params?.subwayLineId?.[0] && { subwayLineId: params?.subwayLineId?.[0] as string }),
   });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <li key={article.id}>
              <ComplaintCard article={article} />
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
