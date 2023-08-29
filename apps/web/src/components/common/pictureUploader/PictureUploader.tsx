import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'
import * as S from './styled'
import { CancelCircle, CameraIcon, PlusIcon } from '@/assets/icons'
import { Picture } from '@/types'

interface PictureUploaderProps {
  pictures: Picture[]
  onUpload: (e: ChangeEvent<HTMLInputElement>, maxCount: number) => void
  deletePicture: (index: number) => void
  maxCount?: number
}

export default function PictureUploader({ pictures, onUpload, deletePicture, maxCount = 3 }: PictureUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpload(e, maxCount)
  }

  return (
    <div css={S.PictureUploader}>
      <div css={S.PictureCount}>
        <CameraIcon />
        <span>
          <b>{pictures.length}</b>/{maxCount}
        </span>
      </div>
      {pictures.map((picture, index) => (
        <div key={index} css={S.ThumbnailWrapper}>
          <div css={S.Thumbnail}>
            <Image src={picture.imgUrl} alt={picture.name} fill priority />
          </div>
          <CancelCircle onClick={() => deletePicture(index)} />
        </div>
      ))}
      {pictures.length < maxCount && (
        <>
          <button css={S.UploadButton} aria-label="사진 업로드 버튼" onClick={handleUploadButtonClick}>
            <PlusIcon />
          </button>
          <input
            css={S.Invisible}
            ref={fileInputRef}
            onChange={handleFileInputChange}
            type="file"
            accept={'image/jpeg, image/jpg, image/png, image/webp'}
            multiple
            aria-hidden
          />
        </>
      )}
    </div>
  )
}
