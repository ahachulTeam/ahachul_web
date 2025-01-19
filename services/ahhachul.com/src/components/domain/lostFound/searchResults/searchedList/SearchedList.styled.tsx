import styled from '@emotion/styled';

import { mixins } from '@/styles';

interface SectionProps {
  isScale?: boolean;
}

export const Section = styled.section<SectionProps>`
  ${({ isScale }) => mixins.animatedLayout(isScale)};
`;

export const ViewMore = styled.span`
  opacity: 0;
  height: 1px;
`;
