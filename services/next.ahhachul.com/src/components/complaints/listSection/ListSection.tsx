import { Box, Flex } from '@ahhachul/react-components-layout';
import { useGetComplaintList } from '@/src/queries/complaints/useGetComplaintList';

import ComplaintCard from './Item';
import { ul } from './style';

function ListSection() {
  const flatData = useGetComplaintList({ page: 0, size: 20 });

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        {flatData.map((article) => (
          <li key={article.id}>
            <ComplaintCard article={article} />
          </li>
        ))}
      </Flex>
    </Box>
  );
}

export default ListSection;
