import React, { forwardRef } from 'react'

import * as S from './styled'
import { CloseFillIcon, SearchIcon } from '@/assets/icons'

export interface SearchInputProps {
  className?: string
  placeholder?: string
  value: string
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
  onSearch: (searchText: string) => void
}

export default forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, placeholder, label, value, onChange, onDelete, onSearch },
  ref
) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value) {
      return
    }

    onSearch(value)
  }

  return (
    <S.SearchForm
      className={className}
      role="search"
      aria-label="지원사업 검색"
      autoComplete="off"
      onSubmit={handleSearch}
    >
      <input ref={ref} aria-label={label} placeholder={placeholder ?? ''} value={value} onChange={onChange} />
      <S.RemoveKeywordBtn
        type="button"
        data-isshow={Boolean(value)}
        aria-label="검색 키워드 삭제 버튼"
        onClick={onDelete}
      >
        <CloseFillIcon />
      </S.RemoveKeywordBtn>
      <S.SearchBtn type="button" aria-label="검색 버튼" onClick={handleSearch}>
        <SearchIcon />
      </S.SearchBtn>
    </S.SearchForm>
  )
})
