import { CSSObject } from '@emotion/react';
import { debounce } from 'lodash-es';
import { useDispatch } from 'react-redux';
import IconSearch from 'shared/static/icons/system/IconSearch';
import { hideModal } from 'stores/search/reducer';
import { f } from 'shared/style';

const DefaultList = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(hideModal());
  const debouncedHide = debounce(closeModal, 200);

  return (
    <section css={wrap}>
      <ul css={ul}>
        {new Array(32).fill('').map((_, idx) => (
          <li key={idx} onClick={debouncedHide}>
            <Item />
          </li>
        ))}
      </ul>
    </section>
  );
};

const Item = () => {
  return (
    <article css={item}>
      <IconSearch />
      <span>
        <b>j</b>asmin
      </span>
    </article>
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
  { maxHeight: 'calc(100vh - 58px - 56px)', marginTop: '8px', paddingBottom: '40px', paddingLeft: '8px' },
];

const item: [CSSObject, CSSObject[], CSSObject] = [
  f.fullWidth,
  f.flexAlignCenter,
  {
    padding: '8px 16px',

    '& > div:first-of-type': {
      width: '20px',
      height: '20px',
      marginRight: '14px',

      '& > svg > path': {
        stroke: '#f5f5f5',
      },
    },

    '& > span': {
      display: 'flex',
      color: '#f5f5f5',
      fontSize: '14px',

      '& > b': {
        color: '#2EE477',
      },
    },
  },
];

export default DefaultList;
