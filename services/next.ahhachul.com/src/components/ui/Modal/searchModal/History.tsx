import React from 'react';

import { Flex } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';
import { Theme } from '@emotion/react';
// import { hideModal } from '@/src/stores/search/reducer';
// import { useDispatch } from 'react-redux';

function HistoryList() {
  // const dispatch = useDispatch();
  const close = () => {
    // dispatch(hideModal());
  };

  return (
    <Flex direction="column" style={{ width: '100%' }}>
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: '100%',
          height: '44px',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        <span css={recentWord}>최근 검색어</span>
        <button css={deleteAll}>모두 지우기</button>
      </Flex>
      <Flex
        gap="6px"
        wrap="nowrap"
        align="center"
        css={{
          width: '100%',
          height: '32px',
          padding: '0 20px',
          overflowX: 'scroll',
          boxSizing: 'border-box',

          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          코레일
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          인스타그램
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          이강인
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          K리그 개막
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          아이유
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          오당기 아이유
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          벚꽃
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          4호선 연착
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          분실물 신고
        </Button>
        <Button
          onClick={close}
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            border: '1px solid hsla(0, 0%, 100%, .2)',
            color: '#c9cedc',
            fontWeight: 500,
            padding: '8px 10px',
            fontSize: '12px',
          }}
        >
          1호선
        </Button>
      </Flex>
    </Flex>
  );
}

const recentWord = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  color: '#c9cedc',
});

const deleteAll = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  color: '#9da5b6',
});

export default HistoryList;
