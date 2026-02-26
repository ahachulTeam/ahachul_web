import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const contentEditableCss = (disalbed: boolean) => (theme: Theme) => css`
  ${theme.fonts.bodyLargeSemi};
  height: 100%;
  width: 100%;
  border: 1px solid ${disalbed ? theme.colors.gray[20] : theme.colors.gray[50]};
  border-radius: 5px;
  padding: 12px 16px;
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
  border-top: 1px solid var(--ah-color-gray-30);
  filter: drop-shadow(0px -1px 12px rgba(0, 0, 0, 0.04));

  & > #editor-container {
    padding: 12px 16px;
    background-color: white;

    & > div {
      border: 0;
      padding: 0;
      background-color: white;
      max-height: 130px !important;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--ah-color-gray-30);
      border-radius: 0;
    }

    & > pre {
      left: 16px;
      top: 13px;
    }
  }
`;

export const SubmitBox = styled.div<{ showIsPrivateBtn?: boolean }>`
  ${({ showIsPrivateBtn }) => css`
    width: 100%;
    margin: 0 auto;
    background: var(--ah-color-white);
    padding: 12px 16px 32px;
    border-radius: 6px;
    overflow: hidden;
    display: grid;
    gap: 8px;
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
    color: var(--ah-color-gray-90);
    font-size: 12px;
    cursor: pointer;
    border: 1px solid var(--ah-color-gray-40);
    border-radius: 3px;
    background-color: var(--ah-color-white);

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
    color: var(--ah-color-white);
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
    background-color: var(--ah-color-key-color);

    &:disabled {
      opacity: 0.5;
      background-color: rgb(101, 103, 107);
    }
  }
`;

export const ImageUrlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > input {
    flex: 1;
    height: 32px;
    border: 1px solid var(--ah-color-gray-40);
    border-radius: 6px;
    padding: 0 10px;
    font-size: 12px;
  }

  & > button {
    height: 32px;
    border-radius: 6px;
    border: 1px solid var(--ah-color-gray-40);
    background: var(--ah-color-white);
    padding: 0 10px;
    font-size: 12px;
    color: var(--ah-color-gray-90);
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      color: var(--ah-color-gray-60);
      background: var(--ah-color-gray-10);
    }
  }
`;

export const ImageError = styled.p`
  color: #b91c1c;
  font-size: 12px;
`;

export const ImagePreviewList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;

  & > li {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--ah-color-gray-30);
  }

  & > li > img {
    width: 100%;
    height: 64px;
    object-fit: cover;
  }

  & > li > button {
    position: absolute;
    right: 2px;
    top: 2px;
    border: none;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.58);
    color: var(--ah-color-white);
    font-size: 10px;
    padding: 0 4px;
    cursor: pointer;
  }
`;
