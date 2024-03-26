import React, { useCallback, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react';
import { InputGroup, Input } from '@ahhachul/react-components-input';

import IconSearch from 'static/icons/system/IconSearch';
import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setKeyword } from 'stores/search';
import { f } from 'styles';
import { useAppSelector } from 'stores';
import { hideModal, setHistory } from 'stores/search/reducer';

// TODO: rxjs 사용해서 최적화하기
function SearchGroup() {
  const dispatch = useDispatch();
  const { history } = useAppSelector((state) => state.search);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) dispatch(setKeyword(null));
    else if (e.target.value.length === 1) dispatch(setKeyword(e.target.value));
    else return;
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pastHistory = !history ? [] : history;
    dispatch(setHistory([inputRef.current.value, ...pastHistory]));
    dispatch(hideModal());
  };

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  return (
    <form css={form} onSubmit={handleSubmit}>
      <InputGroup css={group} onChange={handleChange}>
        <Input ref={inputRef} placeholder="검색어를 입력해주세요." color="#fff" variant="filled" />
        <button css={rightAddon} type="submit">
          <IconSearch />
        </button>
      </InputGroup>
    </form>
  );
}

const form = f.fullWidth;

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
