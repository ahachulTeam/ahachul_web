import { SerializedStyles, css } from '@emotion/react'
import React from 'react'
import { ToastType } from '@/types'

export const copyToClipboard = async (toast: ToastType, linkUrl: string) => {
  try {
    await navigator.clipboard.writeText(linkUrl)
    toast.success('링크 복사 완료')
  } catch (error) {
    toast.error('복사에 실패하였습니다.')
  }
}

export const highlightMatchKeyword = (keyword: string, suggestion: string, highlightCss: SerializedStyles) => {
  const index = suggestion.indexOf(keyword)

  if (index !== -1) {
    const start = suggestion.slice(0, index)
    const match = suggestion.slice(index, index + keyword.length)
    const end = suggestion.slice(index + keyword.length)

    return (
      <React.Fragment>
        {start}
        <span css={highlightCss}>{match}</span>
        {end}
      </React.Fragment>
    )
  }

  return suggestion
}
