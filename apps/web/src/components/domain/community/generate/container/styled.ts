import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.section`
  width: 100%;
  padding: 30px 16px 84px 16px;
`

export const PhotoSection = styled.div`
  margin-bottom: 15px;
`

export const FormSection = styled.form`
  margin-bottom: 15px;
`
export const Line = styled.div`
  margin-bottom: 15px;

  & > button {
    width: 100%;
  }
`
export const Title = styled.div`
  margin-bottom: 15px;

  & > input {
    width: 100%;
  }
`
export const Content = styled.div`
  margin-bottom: 15px;

  & > textarea {
    width: 100%;
  }
`
export const Rules = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: end;
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

export const FieldName = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.semibold14};
    height: 30px;
  `}
`

export const StickyArea = styled.div<{ $isOpenNavigationBar: boolean }>`
  ${({ theme, $isOpenNavigationBar }) => css`
    position: fixed;
    left: 0;
    bottom: ${$isOpenNavigationBar ? '59px' : 0};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 1px solid ${theme.colors.gray_25};
    padding: 14px 15px 25px 15px;
    background-color: ${theme.colors.white};
    transition: all 400ms cubic-bezier(0.43, 0.03, 0.15, 0.95);
    & > button {
      width: 100%;
    }
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    box-sizing: border-box;
    height: 44px;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 110px;
    padding-left: 25px;
    width: auto;
    &::placeholder {
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`

export const Textarea = styled.textarea`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    align-items: center;
    height: 162px;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 20px;
    padding: 12px 25px;
    resize: none;
    &::placeholder {
      ${theme.fonts.regular14};
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`
