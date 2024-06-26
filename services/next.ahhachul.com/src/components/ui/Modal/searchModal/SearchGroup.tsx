import React, { useEffect, useCallback, useRef, type FormEvent, type ChangeEvent } from 'react';
import { InputGroup, Input } from '@ahhachul/react-components-input';

import IconSearch from '@/src/static/icons/system/IconSearch';
import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setKeyword } from '@/src/stores/search';
import { f } from '@/src/styles';
import { useAppSelector } from '@/src/stores';
import { hideModal, setHistory } from '@/src/stores/search/reducer';
import { debounce } from 'lodash-es';
import { Nullable } from '@/src/types';
import { useRouter } from 'next/router';

// TODO: rxjs 사용해서 최적화하기
function SearchGroup() {
  const router = useRouter();
  const asPath = router.asPath.split('?');
  const categoryType = router.query?.categoryType;

  const dispatch = useDispatch();
  const { showModal, history } = useAppSelector((state) => state.search);

  const closeModal = () => dispatch(hideModal());
  const handleKeyword = (keyword: Nullable<string>) => dispatch(setKeyword(keyword));
  const debouncedChange = debounce(handleKeyword, 150);
  const debouncedHide = debounce(closeModal, 200);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) debouncedChange(null);
    else debouncedChange(e.target.value);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    if (inputRef.current) inputRef.current?.blur();

    const pastHistory = !history ? [] : history;
    dispatch(setHistory([inputRef.current!.value, ...pastHistory]));
    debouncedHide();

    if (/^#/.test(inputRef.current!.value)) {
      router.push(
        `${asPath[0]}?tag=${inputRef.current!.value?.replace('#', '')}${categoryType ? `&categoryType=${categoryType}` : ''}`,
        undefined,
        {
          shallow: true,
        },
      );
    } else {
      router.push(
        `${asPath[0]}?keyword=${inputRef.current!.value}${categoryType ? `&categoryType=${categoryType}` : ''}`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  };

  useEffect(() => {
    if (!showModal) return;
    else inputRef.current?.focus?.();
  }, [showModal]);

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
    caretColor: 'rgba(0, 255, 163, .5) !important',
  },
};

const rightAddon: CSSObject = {
  position: 'absolute',
  top: '50%',
  right: '20px',
  transform: 'translateY(-50%)',
};

export default SearchGroup;
