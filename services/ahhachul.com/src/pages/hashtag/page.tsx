import React, { useCallback, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useActivity } from '@stackflow/react';
import { motion } from 'motion/react';
import { debounceTime, Subject } from 'rxjs';

import { SearchIcon } from '@/assets/icons/system';
import { HomeComponent, LayoutComponent, UiComponent } from '@/components';
import { useFlow, useStepFlow } from '@/stackflow';
import { SubwayLineFilterOptions } from '@/types';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/community/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/community/searchResults/searchedList/SearchedList.component'),
);

const HASHTAG_SEARCH_DEBOUNCE_MS = 300;

const HashtagPage = ({ params: { tag } }: any) => {
  const { pop } = useFlow();
  const { isActive } = useActivity();

  return (
    <LayoutComponent.Composed
      navigationSlot={false}
      appBar={{
        overflow: 'visible',
        renderLeft: HomeComponent.HomeHeaderActions,
        renderRight: HomeComponent.HomeHeaderRightActions,
      }}
      outerChildren={
        <FilterGroup isScale isActive={isActive}>
          <div
            css={{
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={pop}
          >
            <button type="button" aria-label="Go Back" css={{ padding: '8px', margin: '-8px' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7241 2.76052C17.105 3.16043 17.0896 3.79341 16.6897 4.17431L8.45 12.0222L16.6896 19.8689C17.0896 20.2498 17.105 20.8827 16.7242 21.2827C16.3433 21.6826 15.7103 21.6981 15.3104 21.3172L6.31037 12.7464C6.11218 12.5576 6.00001 12.2959 6 12.0222C5.99999 11.7486 6.11215 11.4868 6.31032 11.2981L15.3103 2.72608C15.7102 2.34518 16.3432 2.3606 16.7241 2.76052Z"
                  fill="var(--ah-color-black)"
                ></path>
              </svg>
            </button>
          </div>
          <HashtagSearchInput hashTag={tag} />
        </FilterGroup>
      }
    >
      <UiComponent.SuspenseQueryBoundary
        keys={[tag]}
        errorFallback={<div />}
        suspenseFallback={<SearchedListSkeleton isScale />}
      >
        <SearchedList
          filters={{
            hashTag: tag,
            //@ts-expect-error: todo
            communityType: '',
            subwayLineId: SubwayLineFilterOptions.ALL_LINES,
          }}
          isScale
          css={{ paddingTop: '50px' }}
        />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Composed>
  );
};

const HashtagSearchInput = ({ hashTag }: { hashTag?: string }) => {
  const { stepPush } = useStepFlow('HashtagPage');

  const updateKeyword = (value: string) => {
    stepPush({
      tag: value.trim(),
    });
  };

  const subject = useRef(new Subject<string>());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    subject.current.next(value);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inputValue = formData.get('search') as string;
    updateKeyword(inputValue);
    inputRef.current?.blur();
  }, []);

  useEffect(() => {
    const subscription = subject.current
      .pipe(debounceTime(HASHTAG_SEARCH_DEBOUNCE_MS))
      .subscribe(value => updateKeyword(value));

    return () => subscription.unsubscribe();
  }, [updateKeyword]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <SearchIconWrapper type="submit">
        <SearchIcon />
      </SearchIconWrapper>
      <StyledSearchInput
        ref={inputRef}
        name="search"
        placeholder="검색"
        defaultValue={hashTag}
        onChange={handleInputChange}
      />
    </Form>
  );
};

interface FilterGroupProps {
  isScale: boolean;
  isActive: boolean;
}

const FilterGroup = styled.div<FilterGroupProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.white};
  padding-right: 24px;
  z-index: 50;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;

const Form = styled.form`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    background-color: ${theme.colors.white};
  `}
`;

const SearchIconWrapper = styled.button`
  position: absolute;
  left: 6px;
  top: 48%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
`;

const StyledSearchInput = styled(motion.input)`
  ${({ theme }) => css`
    width: 100%;
    max-width: 100%;
    height: 36px;
    border-radius: 9px;
    padding: 0 12px 0 29px;
    font-size: 15px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.gray[20]};
    caret-color: rgba(0, 255, 163, 0.5);
    transition: all 0.3s ease;
    border: 0;

    &::placeholder {
      font-size: 15px;
      color: ${theme.colors.gray[70]};
    }

    &:active:not(:focus) {
      background-color: rgba(119, 119, 119, 0.8);
    }
  `}
`;

export default HashtagPage;
