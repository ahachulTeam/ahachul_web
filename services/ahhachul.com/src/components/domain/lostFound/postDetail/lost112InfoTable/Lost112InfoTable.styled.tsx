import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TableWrapper = styled.div`
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[20]};
  padding: 16px 20px;
`;

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 16px 20px;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[80]};
    padding-bottom: 16px;
    border-bottom: 1px solid ${theme.colors.gray[20]};
  `}
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  padding: 12px 5px;
  font-size: 14px;
`;

export const Label = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[80]};
  `}
`;

export const Value = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[90]};
  `}
`;

export const StyledLink = styled(Value)`
  color: #1d4ed8;
`;

export const StatusWrapper = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green[600]};
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray[20]}`};
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.green[600]};
`;

export const StatusText = styled.span`
  font-size: 14px;
`;
