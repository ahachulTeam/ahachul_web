import { Flex } from '@ahhachul/react-components-layout';
import styled from '@emotion/styled';

const TabBtn = styled(Flex)`
  cursor: pointer;

  & > span {
    width: max-content;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: #fff;
    padding: 6px;
    transition: background-color 0.2s ease;

    & > svg {
      fill: black;

      & > path {
        fill: black;
        stroke: black;
      }
    }
  }

  & > p {
    transition: font-weight 0.2s ease;
  }

  &[aria-selected='true'] {
    & > span {
      background-color: #2acf6c;

      & > svg {
        fill: white;

        & > path {
          fill: white;
          stroke: white;
        }
      }
    }

    & > p {
      font-weight: 700;
    }
  }
`;

export { TabBtn };
