import React, { useEffect, useRef, type ChangeEvent } from 'react';
import { InputGroup, Input } from '@ahhachul/react-components-input';

import IconSearch from 'static/icons/system/IconSearch';
import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setKeyword } from 'stores/search';

function SearchGroup() {
  const dispatch = useDispatch();

  // TODO: rxjs 사용해서 최적화하기
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setKeyword(e.target.value));

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  return (
    <InputGroup css={group} onChange={handleChange}>
      <Input ref={inputRef} placeholder="검색어를 입력해주세요." color="#fff" variant="filled" />
      <IconSearch css={rightAddon} />
    </InputGroup>
  );
}

const group: CSSObject = {
  width: 'calc(100% - 64px)',
  padding: '15px 20px',
  display: 'flex',
  gap: '8px',

  '& > input': {
    width: '100%',
    color: '#ffffff !important',
  },
};

const rightAddon: CSSObject = {
  position: 'absolute',
  top: '50%',
  right: '20px',
  transform: 'translateY(-50%)',
};

export default SearchGroup;
