import { Box, Flex } from '@ahhachul/react-components-layout';
import { useGetComplaintList } from 'queries/complaints/useGetComplaintList';

import ComplaintCard from './Item';
import { ul } from './style';

function ListSection() {
  const flatData = useGetComplaintList({ initPageToken: 0, size: 20 });

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        {flatData.map((article) => (
          <ComplaintCard key={article.id} article={article} />
        ))}
      </Flex>
    </Box>
  );
}

export default ListSection;
