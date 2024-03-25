import React from 'react';

import { Flex, Text } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';

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
        <Text fontSize="xs" style={{ color: '#C1C1C1', fontWeight: 600 }}>
          최근 검색어
        </Text>
        <Text fontSize="xs" style={{ color: '#4D4D4D', fontWeight: 500 }}>
          지우기
        </Text>
      </Flex>
      <Flex
        gap="6px"
        wrap="nowrap"
        align="center"
        css={{
          width: '100%',
          height: '40px',
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
            fontWeight: 400,
          }}
        >
          검색어 1
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 2
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 3
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 4
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 5
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 6
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 7
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 8
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 9
        </Button>
        <Button
          size="sm"
          style={{
            flexShrink: 0,
            borderRadius: '24px',
            background: '#F2F6F9',
            color: '#3D3D3D',
            fontWeight: 400,
          }}
        >
          검색어 910
        </Button>
      </Flex>
    </Flex>
  );
}

export default HistoryList;
