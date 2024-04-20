import { Layout } from '@/src/components/layout';
import { PATH } from '@/src/data';
import { useAuth } from '@/src/providers/AuthProvider';
import { usePostMyStations } from '@/src/queries/member';
import { useAppSelector } from '@/src/stores';
import { f } from '@/src/styles';
import { IToken } from '@/src/types';
import { CSSObject, Theme } from '@emotion/react';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';

export default function MeRegisterCenter() {
  const { auth } = useAuth();
  const router = useRouter();
  const { auth: clientAuth } = useAppSelector((state) => state.auth);

  const [stations, setStations] = useState<string[]>([]);
  const { mutate, status } = usePostMyStations();

  const handleChange = useCallback(
    (station: string) => () => {
      if (stations?.includes(station)) {
        const newStations = stations.filter((el) => el !== station);
        setStations(newStations);
      } else {
        setStations((prev) => [...prev, station]);
      }
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty(stations)) {
      return;
    }

    mutate({
      stationNames: stations,
    });
  };

  useEffect(() => {
    if (status === 'success') {
      auth.signIn(clientAuth as IToken);
      router.replace(PATH.home);
    }
  }, [status]);

  return (
    <Layout headerType="back" title="" nav={false}>
      <form css={wrap} onSubmit={handleSubmit}>
        <div css={section}>
          <span>즐겨찾는역 설정</span>
          <div css={buttonGroup}>
            <button type="button" css={toggleBtn(stations.includes('건대입구역'))} onClick={handleChange('건대입구역')}>
              건대입구역
            </button>
            <button type="button" css={toggleBtn(stations.includes('강남역'))} onClick={handleChange('강남역')}>
              강남역
            </button>
            <button type="button" css={toggleBtn(stations.includes('홍대입구역'))} onClick={handleChange('홍대입구역')}>
              홍대입구역
            </button>
          </div>
        </div>
        <div css={submitWrap}>
          <button css={submitBtn} type="submit" disabled={isEmpty(stations)}>
            다음
          </button>
        </div>
      </form>
    </Layout>
  );
}

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 0 120px 0' }];

const section: [CSSObject, CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#ffffff',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },

      '&[aria-invalid="true"]': {
        borderColor: '#E02020',
      },
    },

    '& > b': {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#E02020',
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
      marginTop: '12px',
      gap: '6px',

      '& > div > svg > path': {
        fill: '#E02020',
        stroke: '#ffffff',

        '&:first-of-type': {
          stroke: '#E02020',
        },
      },
    },
  }),
];

const submitWrap: CSSObject[] = [
  f.fullWidth,
  {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#141517',
    padding: '16px 20px 24px',
  },
];

const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  height: '48px',
  background: 'rgb(196, 212, 252)',
  color: '#141517',
  fontWeight: fontWeight[600],
  borderRadius: '8px',

  '&:disabled': {
    color: '#ffffff',
    opacity: 0.75,
  },
});

const buttonGroup = [f.flexAlignCenter];

const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    border: isActive ? 'none' : '1px solid rgb(196, 212, 252, 0.37)',
    height: '32px',
    borderRadius: '124px',
    padding: '0 14px',
    fontSize: fontSize[14],
    width: 'max-content',
    marginRight: '8px',
    background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
    color: isActive ? '#141517' : '#9da5b6',
    fontWeight: isActive ? fontWeight[600] : fontWeight[400],
  });
