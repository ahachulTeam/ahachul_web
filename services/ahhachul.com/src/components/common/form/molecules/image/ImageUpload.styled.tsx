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
    width: 64px;
    height: 64px;
    border: 1px solid ${({ theme }) => theme.colors.gray[50]};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ disabled }) => (disabled ? 0.1 : 1)};
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  margin-left: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  & > button {
    position: absolute;
    top: -6px;
    right: -6px;
  }
`;
