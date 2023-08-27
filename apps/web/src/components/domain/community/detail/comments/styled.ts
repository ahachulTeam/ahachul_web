import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'

export const GenerateCommentSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 24px 16px;
`

export const CommentListSection = styled.section`
  padding: 16px 20px;
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
    caret-color: rgba(0, 0, 0, 0);

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

export const MiniHamburgerIconButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 0;

  & > svg > g > path {
    fill: #667080;
  }
`

export const commentBoxCss = (theme: Theme) => css`
  position: relative;
  width: 100%;
  min-height: 78px;
  padding: 16px 0;

  & > pre {
    ${theme.fonts.regular14};
    color: ${theme.colors.black};
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    margin-bottom: 8px;
  }

  &[data-status='delete'] {
    & > pre {
      color: ${theme.colors.gray_55};
    }
  }

  &[data-type='child-comment'] {
    padding: 15px 24px 40px 24px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${theme.colors.gray_17};
  }
`

export const commentTopInfoCss = (theme: Theme) => css`
  margin-bottom: 10px;

  & > b {
    ${theme.fonts.semibold14};
    color: #272727;
    margin-right: 8px;
    position: relative;

    &[data-type='child-comment'] {
      &::before {
        content: 'ㄴ';
        display: block;
        position: absolute;
        top: -2px;
        left: -15px;
        width: max-content;
        height: 10px;
        color: ${theme.colors.black};
      }
    }
  }

  & > p {
    ${theme.fonts.regular10};
    color: #c3c3c3;
    display: inline-block;
  }
`

export const commentBottomButtonGroupCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  column-gap: 6px;
  margin-bottom: 10px;

  & > button {
    ${theme.fonts.regular12};
    display: flex;
    align-items: center;
    gap: 4px;
    color: #c3c3c3;
  }
`

export const dialogTitleCss = (theme: Theme) => css`
  ${theme.fonts.semibold16};
`

export const childCommentCss = css`
  display: flex;
  column-gap: 4px;
  margin-bottom: 8px;
`
