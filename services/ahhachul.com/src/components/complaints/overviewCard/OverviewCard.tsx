import React from 'react';
import { Text } from '@ahhachul/react-components-layout';
import { wrap } from './style';

interface ComplaintOverviewCardProps {
  title: string;
  description: string;
}

function ComplaintOverviewCard(props: ComplaintOverviewCardProps) {
  const { title } = props;

  return (
    <div css={wrap}>
      <Text fontSize="xl" as="strong" style={{ fontWeight: 700 }}>
        {title}
      </Text>
    </div>
  );
}

export default ComplaintOverviewCard;
