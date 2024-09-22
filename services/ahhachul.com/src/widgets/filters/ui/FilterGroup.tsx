import React, { useReducer } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Portal } from 'shared/ui/Portal';
// import { ChevronIcon } from 'shared/static/icons/chevron';
import { SearchFilter } from './SearchFilter';
import * as styles from './Filter.css';

export const FilterGroup = () => {
  const [type, setType] = React.useState('인기');
  const [line, setLine] = React.useState('onlyMyLine');
  const [scale, toggleScale] = useReducer((scale) => !scale, false);
  const handleInputFocus = () => {
    toggleScale();
  };

  const showFilterControlButton = type !== '인기' || line !== 'onlyMyLine';
  const controlledFilterLength =
    type !== '인기' && line !== 'onlyMyLine'
      ? 2
      : type !== '인기' || line !== 'onlyMyLine'
        ? 1
        : 0;
  const removeAllFilterControl = () => {
    setType('인기');
    setLine('onlyMyLine');
  };

  return (
    <Portal>
      <div css={styles.motion(scale)} />
      <div css={styles.filterGroup(scale)}>
        <SearchFilter handleFocus={handleInputFocus} />
        <div css={[styles.btn_wrap, styles.dropdownMenu]}>
          {showFilterControlButton && (
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <button css={styles.buttonFilter}>
                  <ChevronDownIcon
                    stroke="#4C5874"
                    className="arrow-down-img"
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                align="start"
                sideOffset={10}
                alignOffset={-10}
                className="DropdownMenuContent"
              >
                <DropdownMenu.Label className="DropdownMenuLabel">
                  {controlledFilterLength}개 필터가 적용됨.
                </DropdownMenu.Label>
                <DropdownMenu.Item
                  className="DropdownMenuItem red"
                  onClick={removeAllFilterControl}
                >
                  모든 필터 지우기
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button css={styles.buttonFilter} data-active={type !== '인기'}>
                <span>{type}</span>
                <ChevronDownIcon
                  className="arrow-down-img"
                  stroke={type !== '인기' ? '#fff' : '#4C5874'}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="start"
              sideOffset={10}
              alignOffset={-10}
              className="DropdownMenuContent"
            >
              <DropdownMenu.RadioGroup value={type} onValueChange={setType}>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="인기"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  인기
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="자유"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  자유
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="정보"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  정보
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="질문"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  질문
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                css={styles.buttonFilter}
                data-active={line !== 'onlyMyLine'}
              >
                <span>
                  {line === 'onlyMyLine' ? '표시 유형' : '전체 호선 보기'}
                </span>
                <ChevronDownIcon
                  className="arrow-down-img"
                  stroke={line !== 'onlyMyLine' ? '#fff' : '#4C5874'}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="start"
              sideOffset={10}
              alignOffset={-10}
              className="DropdownMenuContent"
            >
              <DropdownMenu.RadioGroup value={line} onValueChange={setLine}>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="onlyMyLine"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  내 호선만 보기
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="allLines"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  전체 호선 보기
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {/* <ButtonFilter type="drawer-filter" label="작성자" />
          <ButtonFilter type="drawer-filter" label="정렬: 최신" /> */}
        </div>
      </div>
    </Portal>
  );
};
