import styled from '@emotion/styled';

export const CenterLogoGroup = styled.div`
  position: absolute;
  top: 17.8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    width: 64px;
    height: 64px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > span {
      color: ${({ theme }) => theme.color.text[50]};
      font-size: 16px;
    }
  }
`;
