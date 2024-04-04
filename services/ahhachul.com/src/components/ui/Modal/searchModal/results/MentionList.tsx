import { CSSObject } from '@emotion/react';
import { f } from 'styles';

const MentionList = () => {
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
        <div />
        <div>
          <span>ahcula_173</span>
          <span>아하큘라</span>
        </div>
      </article>
    </li>
  );
};

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
      backgroundColor: 'rgb(54, 54, 54)',
      width: '44px',
      height: '44px',
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

export default MentionList;
