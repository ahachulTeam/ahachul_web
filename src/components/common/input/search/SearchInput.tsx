import { CloseFillIcon, SearchIcon } from "@/assets/icons";
import React from "react";

import * as S from "./styled";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onSearch: (searchText: string) => void;
}

function SearchInput({
  className,
  placeholder,
  label,
  value,
  onChange,
  onDelete,
  onSearch,
}: SearchInputProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    onSearch(value);
  };

  return (
    <S.SearchInput
      className={className}
      role="search"
      aria-label="지원사업 검색"
      autoComplete="off"
      onSubmit={handleSearch}
    >
      <input aria-label={label} placeholder={placeholder ?? ""} value={value} onChange={onChange} />
      <S.IconBtn
        type="button"
        data-isshow={!!value}
        aria-label="검색 키워드 삭제 버튼"
        css={S.closeIconStyle}
        onClick={onDelete}
      >
        <CloseFillIcon />
      </S.IconBtn>
      <S.IconBtn type="button" aria-label="검색 버튼" onClick={handleSearch}>
        <SearchIcon />
      </S.IconBtn>
    </S.SearchInput>
  );
}

export default SearchInput;
