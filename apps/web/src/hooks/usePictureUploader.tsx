import axios from 'axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useToast } from './useToast'
import { Picture } from '@/types'

export const usePictureUploader = () => {
  const toast = useToast()
  const router = useRouter()

  const [pictures, setPictures] = useState<Picture[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onUpload = async (e: ChangeEvent<HTMLInputElement>, maxCount: number) => {
    setIsLoading(true)

    const files = Array.from(e.target.files || [])

    if (pictures.length + files.length > maxCount) {
      toast.error(
        <>
          사진은 <b>최대 {maxCount}개</b>까지 업로드 가능합니다
        </>
      )
      setIsLoading(false)
      return
    }

    const uploadPictures = Promise.all(
      files.map(async targetFile => {
        let imgUrl = 'no-content'

        try {
          const {
            data: { url: receivedUrl },
          } = await axios.post('/api/upload', {
            file: {
              name: targetFile.name,
              type: targetFile.type,
              path: router.pathname.split('/').length > 1 ? router.pathname.split('/')[1] : '',
            },
          })

          const result = await axios.put(receivedUrl, targetFile, {
            headers: {
              'Content-Type': targetFile.type,
            },
          })

          if (!result || !result.config || !result.config.url) {
            throw new Error()
          }

          imgUrl = result.config.url.split('?')[0]
        } catch (error) {
          console.error(`Error at Image Upload: ${targetFile.name} 업로드 실패`)
        }

        return {
          name: targetFile.name,
          imgUrl,
        }
      })
    )

    uploadPictures.then(item => {
      setIsLoading(false)

      if (item.some(item => item.imgUrl === 'no-content')) {
        toast.error('이미지 업로드에 실패했습니다')
        return
      }

      setPictures(prev => [...prev, ...item])
    })
  }

  const deletePicture = (targetIndex: number) => {
    setPictures(prev => prev.filter((_, index) => index !== targetIndex))
  }

  return { pictures, isLoading, provided: { onUpload, deletePicture } }
}
