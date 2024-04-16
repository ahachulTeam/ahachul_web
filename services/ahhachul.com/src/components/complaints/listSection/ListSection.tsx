import { Box, Flex } from '@ahhachul/react-components-layout';
import { UiComponent } from 'components';
import { useGetComplaintList } from 'queries/complaints/useGetComplaintList';
import { flattenInfinityListData } from 'utils/response';

import ComplaintCard from './Item';
import { ul } from './style';

function ListSection() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetComplaintList({ page: 0, size: 20 });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <ComplaintCard key={article.id} article={article} />
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
