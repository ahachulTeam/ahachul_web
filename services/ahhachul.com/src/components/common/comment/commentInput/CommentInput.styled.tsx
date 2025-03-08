import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const contentEditableCss = (disalbed: boolean) => (theme: Theme) => css`
  ${theme.fonts.bodyLargeSemi};
  height: 100%;
  width: 100%;
  border: 1px solid ${disalbed ? theme.colors.gray[20] : theme.colors.gray[50]};
  border-radius: 5px;
  padding: 12px;
  overflow: hidden;
  text-wrap: wrap;
  color: ${theme.colors.gray[90]};
  background-color: ${disalbed ? theme.colors.gray[20] : theme.colors.white};

  &:focus {
    outline: none;
  }
`;

export const EditorContainer = styled.div`
  position: relative;
`;

export const Container = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #eaecf1;
  filter: drop-shadow(0px -1px 12px rgba(0, 0, 0, 0.04));

  & > #editor-container {
    padding: 12px;
    background-color: white;

    & > div {
      border: 0;
      padding: 0;
      background-color: white;
      max-height: 130px !important;
      padding-bottom: 12px;
      border-bottom: 1px solid #eaecf1;
      border-radius: 0;
    }

    & > pre {
      left: 13px;
      top: 13px;
    }
  }
`;

export const SubmitBox = styled.div<{ showIsPrivateBtn?: boolean }>`
  ${({ showIsPrivateBtn }) => css`
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 12px 8px;
    padding-top: 0;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: ${showIsPrivateBtn ? 'space-between' : 'flex-end'};
  `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > button:first-of-type {
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    padding: 5px 8px;
    color: #33333e;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #dcdee7;
    border-radius: 3px;
    background-color: #fff;

    &:disabled {
      opacity: 0.5;
      background-color: rgb(101, 103, 107);
    }
  }

  & > button:last-of-type {
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    padding: 5px 8px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
    background-color: #2acf6c;

    &:disabled {
      opacity: 0.5;
      background-color: rgb(101, 103, 107);
    }
  }
`;
