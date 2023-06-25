import { Theme, css } from '@emotion/react'

export const PictureUploader = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const PictureCount = (theme: Theme) => css`
  ${theme.fonts.semibold14}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.gray_40};

  b {
    color: ${theme.colors.primary};
  }
`

export const Thumbnail = (theme: Theme) => css`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.gray_19};
  overflow: hidden;

  > img {
    object-fit: cover;
  }
`

export const UploadButton = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 1px solid ${theme.colors.secondary};
  border-radius: 15px;
  cursor: pointer;

  path {
    fill: ${theme.colors.secondary};
  }
`
export const Invisible = css`
  display: none;
`
