import styled from "@emotion/styled";

export const ChangeView = styled.div``;
export const ChangeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  & > svg {
    transition: all 0.3s ease-in-out;
  }

  @media (hover: hover) {
    &:hover > svg {
    }
  }
`;
