import React from 'react';

import { Flex } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';
import { Theme } from '@emotion/react';

function HistoryList() {
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
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          코레일
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          인스타그램
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          이강인
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          K리그 개막
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          아이유
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          오당기 아이유
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          벚꽃
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          4호선 연착
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
          }}
        >
          분실물 신고
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 500,
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #141517',
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
  color: '#c1c1c1',
});

const deleteAll = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  color: '#9da5b6',
});

export default HistoryList;
