import styled from '@emotion/styled';

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 32px;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    padding-left: 20px;

    & > p {
      ${({ theme }) => theme.fonts.labelLarge};
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;
