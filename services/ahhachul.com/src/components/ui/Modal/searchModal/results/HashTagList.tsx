import { CSSObject } from '@emotion/react';
import { f } from 'styles';

const HashTagList = () => {
  return (
    <section css={wrap}>
      <ul css={ul}>
        {new Array(32).fill('').map((_, idx) => (
          <Item key={idx} />
        ))}
      </ul>
    </section>
  );
};

const Item = () => {
  return (
    <li>
      <article css={item}>
        <div dangerouslySetInnerHTML={{ __html: HashTagSvg }}></div>
        <div>
          <span>#벚꽃</span>
          <span>게시물 10.6만</span>
        </div>
      </article>
    </li>
  );
};

const HashTagSvg = `<svg aria-label="해시태그" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>해시태그</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4.728" x2="20.635" y1="7.915" y2="7.915"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3.364" x2="19.272" y1="15.186" y2="15.186"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="17.009" x2="13.368" y1="2" y2="22"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.64" x2="7" y1="2" y2="22"></line></svg>`;

const wrap = {
  width: '100%',
  height: '100%',
  color: '#fffffF',
  backgroundColor: '#141517',
};

const ul = [
  f.flexColumn,
  f.fullWidth,
  f.overflowScroll,
  { maxHeight: 'calc(100vh - 58px - 56px)', marginTop: '8px', paddingBottom: '40px' },
];

const item: [CSSObject, CSSObject[], CSSObject] = [
  f.fullWidth,
  f.flexAlignCenter,
  {
    padding: '8px 16px',

    '& > div:first-of-type': {
      marginRight: '12px',
      borderRadius: '50%',
      border: '1px solid rgb(54, 54, 54)',
      width: '44px',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '& > div:last-of-type': {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',

      '& > span:first-of-type': {
        color: '#f5f5f5',
        fontWeight: 600,
      },

      '& > span:last-of-type': {
        color: '#a8a8a8',
      },
    },
  },
];

export default HashTagList;
