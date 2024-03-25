import React from 'react';

import { Flex, Text } from '@ahhachul/react-components-layout';
import IconPolygon from 'static/icons/system/IconPolygon';

function HashTagList() {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginTop: '15px',
          height: '40px',
          padding: '0 20px',
          width: '100%',
        }}
      >
        <Text
          fontSize="md"
          style={{
            fontWeight: 700,
          }}
        >
          인기 검색어
        </Text>
      </Flex>
      <Flex direction="column" style={{ padding: '0 20px' }}>
        <Flex align="center" gap="16px" style={{ height: '50px', position: 'relative' }}>
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: '16px' }}>
            1
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
            }}
          />
        </Flex>
        <Flex align="center" gap="16px" style={{ height: '50px', position: 'relative' }}>
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: '16px' }}>
            2
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%) rotate(180deg)',
            }}
          />
        </Flex>
        <Flex align="center" gap="16px" style={{ height: '50px', position: 'relative' }}>
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: '16px' }}>
            3
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
            }}
          />
        </Flex>
        <Flex align="center" gap="16px" style={{ height: '50px', position: 'relative' }}>
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: '16px' }}>
            4
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%) rotate(180deg)',
            }}
          />
        </Flex>
        <Flex align="center" gap="16px" style={{ height: '50px', position: 'relative' }}>
          <Text fontSize="sm" style={{ fontWeight: 500, minWidth: '16px' }}>
            5
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기 해쉬태그
          </Text>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default HashTagList;
