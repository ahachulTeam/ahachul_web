import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'

export const GenerateCommentSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 24px 16px;
`

export const CommentListSection = styled.section`
  padding: 0 16px;
`

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
    margin-bottom: 15px;

    & > b {
      color: ${theme.colors.primary};
    }
  `}
`

export const CommentInput = styled.input`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 110px;
    padding-left: 25px;

    &::placeholder {
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`

export const InputCoverBtn = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
`

export const commentBoxCss = (theme: Theme) => css`
  position: relative;
  width: 100%;
  padding: 20px;

  & > pre {
    ${theme.fonts.regular14};
    color: #272727;
  }
`

export const commentTopInfoCss = (theme: Theme) => css`
  margin-bottom: 10px;

  & > b {
    ${theme.fonts.semibold14};
    color: #272727;
    margin-right: 4px;
  }

  & > p {
    ${theme.fonts.regular14};
    color: #c3c3c3;
    display: inline-block;
  }
`

export const commentBottomButtonGroupCss = (theme: Theme) => css`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  column-gap: 4px;
  margin-bottom: 10px;

  & > button {
    ${theme.fonts.regular12};
    color: #676767;
  }
`
