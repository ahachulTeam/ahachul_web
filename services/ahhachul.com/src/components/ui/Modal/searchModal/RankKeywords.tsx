import React from 'react';

import { Flex } from '@ahhachul/react-components-layout';
import IconPolygon from 'static/icons/system/IconPolygon';
import { Theme } from '@emotion/react';

function RankKeywords() {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginTop: '24px',
          height: '40px',
          padding: '0 20px',
          width: '100%',
        }}
      >
        <span css={recentWord}>인기 해시태그</span>
      </Flex>
      <Flex direction="column" gap="24px" style={{ padding: '12px 20px' }}>
        <Flex align="center" gap="12px" style={{ position: 'relative' }}>
          <span css={[text, { minWidth: '16px' }]}>1</span>
          <span css={text}>연착 40분</span>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',

              '& > svg > path': {
                fill: '#FF5454',
              },
            }}
          />
        </Flex>
        <Flex align="center" gap="12px" style={{ position: 'relative' }}>
          <span css={[text, { minWidth: '16px' }]}>2</span>
          <span css={text}>지하철 파업</span>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',

              '& > svg': {
                transform: 'rotate(180deg)',

                '> path': {
                  fill: '#4E41DB',
                },
              },
            }}
          />
        </Flex>
        <Flex align="center" gap="12px" style={{ position: 'relative' }}>
          <span css={[text, { minWidth: '16px' }]}>3</span>
          <span css={text}>릴스 중독녀</span>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',

              '& > svg > path': {
                fill: '#FF5454',
              },
            }}
          />
        </Flex>
        <Flex align="center" gap="12px" style={{ position: 'relative' }}>
          <span css={[text, { minWidth: '16px' }]}>4</span>
          <span css={text}>아이폰 분실</span>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',

              '& > svg > path': {
                fill: '#FF5454',
              },
            }}
          />
        </Flex>
        <Flex align="center" gap="12px" style={{ position: 'relative' }}>
          <span css={[text, { minWidth: '16px' }]}>5</span>
          <span css={text}>구찌 대란</span>
          <IconPolygon
            css={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',

              '& > svg': {
                transform: 'rotate(180deg)',

                '> path': {
                  fill: '#4E41DB',
                },
              },
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}

const recentWord = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  color: '#c9cedc',
});

const text = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[400],
  color: '#9da5b6',
});

export default RankKeywords;
