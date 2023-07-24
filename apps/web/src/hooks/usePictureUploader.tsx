import { ChangeEvent, useState } from 'react'
import { useToast } from './useToast'
import { Picture } from '@/types'

export const usePictureUploader = () => {
  const toast = useToast()

  const [pictures, setPictures] = useState<Picture[]>([])

  const onUpload = (e: ChangeEvent<HTMLInputElement>, maxCount: number) => {
    const files = Array.from(e.target.files || [])

    if (pictures.length + files.length > maxCount) {
      toast.error(
        <>
          사진은 <b>최대 {maxCount}개</b>까지 업로드 가능합니다
        </>
      )
      return
    }

    const uploadPictures = files.map(file => ({
      name: file.name,
      imgUrl: URL.createObjectURL(file),
      file: file,
    }))

    setPictures(prev => [...prev, ...uploadPictures])
  }

  return { pictures, provided: { onUpload } }
}
