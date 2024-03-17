import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { vars } from '@ahhachul/themes';
import { Box, Flex } from '@ahhachul/react-components-layout';

import TalkLoungeCard from './Item';

function ListSection() {
  return (
    <Box as="section" background="gray" style={{ padding: '22px 0' }}>
      <Flex as="ul" direction="column" gap="20px">
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
        <TalkLoungeCard />
      </Flex>
    </Box>
  );
}

export function ListSkeleton() {
  return (
    <Box as="section" background="gray" style={{ padding: '22px 0' }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </Box>
  );
}

const opacity = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
`;

const Skeleton = styled.div<{
  width: string | number;
  height: string | number;
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: vars.colors.$scale.gray[100],
  animation: `${opacity} 2s ease-in-out 0.5s infinite`,
}));

export default ListSection;
