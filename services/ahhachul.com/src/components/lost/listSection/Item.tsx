import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';
import { CSSProperties } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useFlow } from 'stackflow';
import IconComment from 'static/icons/system/IconComment';
import IconDM from 'static/icons/system/IconDM';
import { f } from 'styles';
import { ILost } from 'types';
import { exportHexColorWidthLineName, exportLineNameWithSubwayLineId } from 'utils/export';
import { formatDate } from 'utils/time';

function Item({ article }: { article: ILost }) {
  const { push } = useFlow();
  const navigateToDetail = () => push('LostDetail', { articleId: article.id.toString() });

  const noImg = article.imageUrl.includes('no_img');

  return (
    <li onClick={navigateToDetail}>
      <Flex as="article" direction="column" gap="12px" css={wrap}>
        <Flex direction="column">
          <div css={{ marginBottom: '12px' }}>
            <span css={nickname}>{article.createdBy === 'SYSTEM' ? 'LOST112' : article.writer}</span>
            <time css={time}>{formatDate(new Date(article.date))}</time>
          </div>
          <div css={trainLabelsWrap(exportHexColorWidthLineName(article.subwayLine))}>
            <span>{exportLineNameWithSubwayLineId(article.subwayLine)}</span>
          </div>
        </Flex>
        <Flex justify="space-between">
          <p css={content as unknown as CSSObject}>{article.title}</p>
          <div css={img}>
            {!noImg && (
              <LazyLoadImage
                src={article.imageUrl}
                alt=""
                width="100%"
                height="100%"
                effect="opacity"
                css={{ objectFit: 'cover', borderRadius: '6px' }}
              />
            )}
          </div>
        </Flex>
        <Flex align="center">
          <div css={label}>
            <IconComment /> <span>0</span>
          </div>
          <div css={label}>
            <IconDM css={{ width: '16px', height: '16px' }} /> <span>{article.chats}</span>
          </div>
        </Flex>
      </Flex>
    </li>
  );
}

const wrap = {
  padding: '12px 0',
};

const nickname = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[600],
  color: '#c9cedc',
});

const time = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#9da5b6',
  marginLeft: '6px',
});

const trainLabelsWrap =
  (pointColor: CSSProperties['color']) =>
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      padding: '0 8px',
      height: '20px',
      color: gray[1000],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      background: pointColor,
    },
  });

const content = [
  f.truncate2,
  ({ typography: { fontSize } }: Theme) => ({
    fontSize: fontSize[14],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
  }),
];

const img: CSSObject = {
  width: '50px',
  minWidth: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginLeft: '16px',

  '& > img': {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '6px',
  },
};

const label = ({ typography: { fontSize } }: Theme): CSSObject => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',

  '& > span': {
    fontSize: fontSize[12],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
    marginLeft: '4px',
  },
});

export default Item;
