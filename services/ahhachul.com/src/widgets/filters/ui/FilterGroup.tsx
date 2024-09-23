import React from 'react';
import { Drawer } from 'vaul';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { SearchIcon } from 'widgets/layout-header/static/icons/search';
import { SearchFilter } from './SearchFilter';
import * as styles from './Filter.css';

interface FilterGroupProps {
  isScale: boolean;
  typeList: string[];
  isActive: boolean;
  toggleScale: VoidFunction;
}
export const FilterGroup = ({
  isScale,
  typeList,
  isActive,
  toggleScale,
}: FilterGroupProps) => {
  const [type, setType] = React.useState(typeList[0]);
  const [line, setLine] = React.useState('allLines');
  const handleInputFocus = () => {
    toggleScale();
  };

  const showFilterControlButton = type !== typeList[0] || line !== 'allLines';
  const controlledFilterLength =
    type !== typeList[0] && line !== 'allLines'
      ? 2
      : type !== typeList[0] || line !== 'allLines'
        ? 1
        : 0;
  const removeAllFilterControl = () => {
    setType(typeList[0]);
    setLine('allLines');
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div css={styles.motion(isScale)} />
      <div css={styles.filterGroup(isScale, isActive)}>
        <SearchFilter handleFocus={handleInputFocus} />
        <div css={[styles.btn_wrap, styles.dropdownMenu]}>
          {showFilterControlButton && (
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <button css={styles.buttonFilter}>
                  <span css={styles.controlledFilterLength}>
                    {controlledFilterLength}
                  </span>
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
              <button
                css={styles.buttonFilter}
                data-active={type !== typeList[0]}
              >
                <span>{type}</span>
                <ChevronDownIcon
                  className="arrow-down-img"
                  stroke={type !== typeList[0] ? '#fff' : '#4C5874'}
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
                {typeList.map((item) => (
                  <DropdownMenu.RadioItem
                    key={item}
                    className="DropdownMenuRadioItem"
                    value={item}
                  >
                    <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {item}
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                css={styles.buttonFilter}
                data-active={line !== 'allLines'}
              >
                <span>
                  {line === 'allLines' ? '표시 유형' : '내 호선만 보기'}
                </span>
                <ChevronDownIcon
                  className="arrow-down-img"
                  stroke={line !== 'allLines' ? '#fff' : '#4C5874'}
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
                  value="allLines"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  전체 호선 보기
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="onlyMyLine"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  내 호선만 보기
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Drawer.Root
            open={open}
            onOpenChange={setOpen}
            repositionInputs={false}
            shouldScaleBackground
          >
            <Drawer.Trigger asChild>
              <button css={styles.buttonFilter}>
                <span>작성자</span>
                <ChevronDownIcon
                  className="arrow-down-img"
                  stroke={'#4C5874'}
                />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay css={styles.overlay} />
              <Drawer.Content css={styles.drawerContainer}>
                <div css={styles.content}>
                  {/* <div css={styles.handle} /> */}
                  <div css={styles.drawerHeader}>
                    <button css={styles.cancel} onClick={() => setOpen(false)}>
                      취소
                    </button>
                    <Drawer.Title css={styles.headerTitle}>
                      작성자별 필터링
                    </Drawer.Title>
                    <button css={styles.done} onClick={() => setOpen(false)}>
                      완료
                    </button>
                  </div>
                  <div css={styles.searchGroup}>
                    <button css={styles.addOn}>
                      <SearchIcon />
                    </button>
                    <input css={styles.input} placeholder="사용자 필터링" />
                  </div>
                  <div
                    css={{
                      backgroundColor: '#2E2F37',
                      height: 'calc(100% - 200px)',
                      borderRadius: '12px',
                    }}
                  />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          {/* <ButtonFilter type="drawer-filter" label="작성자" />
          <ButtonFilter type="drawer-filter" label="정렬: 최신" /> */}
        </div>
      </div>
    </>
  );
};
