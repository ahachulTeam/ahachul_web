import styled from '@emotion/styled';

interface WrapperProps {
  disabled: boolean;
}

export const UploadWrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 20px;

  & > label {
    width: 55px;
    height: 55px;
    border: 1px solid ${({ theme }) => theme.colors.gray[50]};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ disabled }) => (disabled ? 0.1 : 1)};

    & > div {
      width: 18px;
      height: 18px;

      & > svg > path {
        stroke: #9da5b6;
      }
    }
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 53px;
  height: 53px;
  border-radius: 8px;
  margin-left: 8px;
  border: 1px solid #141517;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  & > button > div {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 18px;
    height: 18px;
  }
`;
