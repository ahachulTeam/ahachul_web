import React, { useEffect, useState } from 'react';
import { BottomSheet } from 'components/ui';

import { top, content, buttonGroup, toggleBtn, submitWrap, submitBtn } from './style';
import { Nullable } from 'types';
import { subwayLineInfo } from 'data/subway';

interface Props {
  isShowing: boolean;
  subwayLineId?: string;
  onClose: VoidFunction;
  handleSubwayLine: (subwayLine: Nullable<string>) => void;
}

function SubwayLineBottomSheet({ isShowing, subwayLineId, onClose, handleSubwayLine }: Props) {
  const [active, setActive] = useState<Nullable<string>>(null);

  const handleClickLine = (line: string) => () => {
    setActive(active === line ? null : line);
  };

  const submit = () => {
    onClose();
    handleSubwayLine(active as string);
  };

  const cancel = () => {
    onClose();
    handleSubwayLine(null);
  };

  useEffect(() => {
    if (isShowing) {
      setActive(subwayLineId ? subwayLineId : null);
    }
  }, [isShowing, subwayLineId]);

  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose} header hasIOSIndicatorArea isDraggable>
      <div css={top}>
        <span>호선 선택</span>
      </div>
      <div css={content}>
        <ul css={buttonGroup}>
          {subwayLineInfo.map((item) => (
            <li key={item.subwayLineId}>
              <button css={toggleBtn(active === item.subwayLineId)} onClick={handleClickLine(item.subwayLineId)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div css={submitWrap(Boolean(subwayLineId))}>
          {subwayLineId && (
            <button css={[submitBtn, { background: 'inherit', color: '#ffffff' }]} onClick={cancel}>
              초기화
            </button>
          )}
          <button css={submitBtn} disabled={!active} onClick={submit}>
            적용하기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default SubwayLineBottomSheet;
