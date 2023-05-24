import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.section`
  width: 100%;
  padding: 30px 16px;
`

export const PhotoSection = styled.div`
  margin-bottom: 15px;
`

export const FormSection = styled.form`
  margin-bottom: 15px;
`
export const Line = styled.div`
  & > button {
    width: 100%;
  }
`
export const Title = styled.div`
  & > input {
    width: 100%;
  }
`
export const Content = styled.div`
  & > textarea {
    width: 100%;
  }
`
export const Rules = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    & > button {
      margin-bottom: 10px;
      width: max-content;

      & > svg {
        transform: rotate(180deg);
      }
    }

    & > p {
      ${theme.fonts.regular10};
      color: ${theme.colors.gray_40};
      line-height: 2.1;
    }
  `}
`

export const FieldName = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium14};
  `}
`
export const StickyArea = styled.div`
  ${({ theme }) => css`
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 1px solid ${theme.colors.gray_25};
    padding: 14px 15px 25px 15px;

    & > button {
      width: 100%;
    }
  `}
`
