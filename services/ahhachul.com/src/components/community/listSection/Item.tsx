import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';
import { CSSProperties } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useFlow } from 'stackflow';
import IconComment from 'shared/static/icons/system/IconComment';
import IconHeart from 'shared/static/icons/system/IconHeart';
import { f } from 'shared/style';
import { ICommunity } from 'types';
import { exportHexColorWidthLineName, exportLineNameWithSubwayLineId } from 'utils/export';

function Item({ article }: { article: ICommunity }) {
  const { push } = useFlow();
  const navigateToDetail = () => push('CommunityDetail', { articleId: article.id.toString() });

  return (
    <li onClick={navigateToDetail}>
      <Flex as="article" direction="column" gap="12px" css={wrap}>
        <Flex direction="column">
          <div css={{ marginBottom: '12px' }}>
            <span css={nickname}>{article.writer}</span>
            <time css={time}>오후 3:00</time>
          </div>
          <div css={trainLabelsWrap(exportHexColorWidthLineName(article.subwayLineId))}>
            <span>{exportLineNameWithSubwayLineId(article.subwayLineId)}</span>
          </div>
        </Flex>
        <Flex justify="space-between">
          <p css={content as unknown as CSSObject}>{article.title}</p>
          <div css={img}>
            <LazyLoadImage
              src={article.image.imageUrl}
              alt=""
              width="100%"
              height="100%"
              effect="opacity"
              css={{ objectFit: 'cover', borderRadius: '6px' }}
            />
          </div>
        </Flex>
        <Flex align="center">
          <div css={label}>
            <IconHeart /> <span>{article.likeCnt}</span>
          </div>
          <div css={label}>
            <IconComment /> <span>{article.commentCnt}</span>
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
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme) => ({
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
