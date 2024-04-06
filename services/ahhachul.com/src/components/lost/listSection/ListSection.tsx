import { Box, Flex } from '@ahhachul/react-components-layout';

import LostCard from './Item';
import { useGetLostList } from 'queries/lost/useGetLostList';
import { useAppSelector } from 'stores';
import { ul } from './style';

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.lost);
  const flatData = useGetLostList({ initPageToken: 0, size: 20, lostType: activeTab });

  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={ul}>
        {flatData.map((article) => (
          <LostCard key={article.id} article={article} />
        ))}
      </Flex>
    </Box>
  );
}

export default ListSection;
