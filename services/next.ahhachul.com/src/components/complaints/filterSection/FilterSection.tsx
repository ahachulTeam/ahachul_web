import { CSSObject, Theme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import IconChevron from '@/src/static/icons/system/IconChevron';
import { addSnackBar } from '@/src/stores/ui';
import { f } from '@/src/styles';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import IconCircleClose from '@/src/static/icons/system/IconCircleClose';

const FilterSection = () => {
  const params = useParams();
  const router = useRouter();
  const keyword = router?.query?.keyword;
  const subwayLineId = params?.subwayLineId?.[0];

  const handleDeleteKeyword = () => {
    router.push(`${router.asPath?.split('?')?.[0]}`);
  };

  const dispatch = useDispatch();
  const handleClickFilter = () => {
    dispatch(addSnackBar({ message: '준비중이에요', posBottom: 155 }));
  };

  return (
    <section css={wrap}>
      <ul css={ul}>
        {keyword && (
          <li>
            <button css={keywordBtn}>
              {keyword}
              <IconCircleClose onClick={handleDeleteKeyword} />
            </button>
          </li>
        )}
        <li>
          <button css={filterBtn(Boolean(subwayLineId))} onClick={handleClickFilter}>
            {subwayLineId || ''}호선
            <IconChevron />
          </button>
        </li>
      </ul>
    </section>
  );
};

const wrap = [
  f.fullWidth,
  f.sideGutter,
  {
    marginBottom: '16px',
  },
];

const ul: [CSSObject[], CSSObject, CSSObject, CSSObject] = [
  f.flexAlignCenter,
  f.overflowScroll,
  f.posRel,
  {
    overflowY: 'hidden',
    overflowX: 'scroll',
    justifyContent: 'flex-end',
    gap: '8px',
  },
];

const keywordBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  flexShrink: 0,
  border: '1px solid rgb(196, 212, 252, 0.47)',
  height: '30px',
  borderRadius: '124px',
  padding: '0 10px 0 14px',
  width: 'max-content',
  color: 'rgb(196, 212, 252)',
  fontSize: fontSize[12],
  fontWeight: fontWeight[600],
  transition: 'opacity 0.3s ease-in-out',
  willChange: 'opacity',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  '&:active': {
    opacity: '0.4',
  },

  '& > div': {
    width: '18px',
    height: '18px',
    zIndex: 10,

    '& > svg > path': {
      stroke: 'rgb(196, 212, 252)',
    },
  },
});

const filterBtn =
  (hasCondition: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    flexShrink: 0,
    border: '1px solid rgb(196, 212, 252, 0.47)',
    height: '30px',
    borderRadius: '124px',
    padding: '0 10px 0 14px',
    width: 'max-content',
    color: 'rgb(196, 212, 252)',
    fontSize: fontSize[12],
    fontWeight: hasCondition ? fontWeight[700] : fontWeight[600],
    transition: 'opacity 0.3s ease-in-out',
    willChange: 'opacity',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    '&:active': {
      opacity: '0.4',
    },

    '& > div': {
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      transform: 'rotate(90deg)',

      '& > svg > path': {
        stroke: 'rgb(196, 212, 252)',
      },
    },
  });

export default FilterSection;
