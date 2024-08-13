import { Layout } from '@/src/components/layout';
import { PATH } from '@/src/data';
import { useAuth } from '@/src/providers/AuthProvider';
import { usePostMyStations } from '@/src/queries/member';
import { useAppSelector } from '@/src/stores';
import { f } from '@/src/styles';
import { IToken } from '@/src/types';
import { IStation } from '@/src/types/subway';
import { exportHexColorWidthLineName } from '@/src/utils/export';
import { subwayInfoList } from '@/src/utils/subway';
import { CSSObject, Theme } from '@emotion/react';
import { throttle } from 'lodash-es';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const defaultStationLabels = ['home', 'company', 'school', 'favorite'];

export default function MeRegisterCenter() {
  const { auth } = useAuth();
  const router = useRouter();
  const { auth: clientAuth } = useAppSelector((state) => state.auth);

  const { status } = usePostMyStations();

  const stationInfos = subwayInfoList;
  const [isUserTyped, setIsUserTyped] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [refinedStationFromSearchKeyword, setRefinedStationFromSearchKeyword] = useState<
    { label: string; info: IStation[] }[]
  >([] as { label: string; info: IStation[] }[]);

  const filteredStations = useCallback(
    (station: string) => {
      setRefinedStationFromSearchKeyword(
        Object.entries(stationInfos)
          ?.filter((s) => {
            const [stationName] = s;
            return stationName.includes(station);
          })
          .map((station) => {
            const [stationName, stationInfo] = station;
            return {
              label: stationName,
              info: stationInfo,
            };
          }),
      );
    },
    [stationInfos],
  );

  const delayedFoundStationInfo = useRef(
    throttle((searchKeyword: string) => filteredStations(searchKeyword), 150),
  ).current;

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value?.length > 0) {
      setIsUserTyped(true);
    } else {
      setIsUserTyped(false);
    }
    setSearchKeyword(value);
    delayedFoundStationInfo(value);
  };

  const [selected, setSelected] = useState<{ stationName: string; label?: string; showLabels: boolean }[]>([]);
  const handleStation = (stationName: string) => () => {
    if (selected.length === 3) {
      console.log('3 is max');
    } else {
      const alreadySelected = selected.filter((item) => item.stationName === stationName).length > 0;
      if (alreadySelected) {
        setSelected((prev) => [...prev, { stationName, showLabels: false }]);
      } else {
        setSelected((prev) => [...prev, { stationName, showLabels: true }]);
      }
    }
  };

  // const handleLabel = (stationName: string, label: string) => {
  //   const copy = [...selected];
  //   const itemIdx = copy.findIndex((item) => item.stationName === stationName);
  //   copy[itemIdx] = { stationName, label, showLabels: true };
  //   const newSelected = copy;
  //   setSelected(newSelected);
  // };

  // if selected station has label ?
  const excludeListForAlreadySelectedLabel = useMemo(() => {
    const labels = selected.map((item) => item.label);
    const uniqueLabels = defaultStationLabels.filter((label) => !defaultStationLabels.includes(label));
    return uniqueLabels;
  }, [selected]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (isEmpty(stations)) {
    //   return;
    // }

    // mutate({
    //   stationNames: stations,
    // });
  };

  // useEffect(() => {
  //   if (!clientAuth) {
  //     router.replace(PATH.signin);
  //   }
  // }, [clientAuth]);

  useEffect(() => {
    if (status === 'success') {
      auth.signIn(clientAuth as IToken);
      router.replace(PATH.home);
    }
  }, [status]);

  return (
    <Layout headerType="back" title="회원가입" nav={false}>
      <form css={wrap} onSubmit={handleSubmit}>
        <div css={section}>
          <span>즐겨찾는역 설정</span>
          <input id="search-station" placeholder="역 검색" value={searchKeyword} onChange={searchChange} />
        </div>
        <div css={section}>
          {isUserTyped && (
            <ul>
              {refinedStationFromSearchKeyword.map((station, idx) => (
                <li key={idx} onClick={handleStation(station.label)}>
                  <div css={{ color: '#fff', marginBottom: '8px' }}>
                    {station.info.map((item, idx) => (
                      <span
                        key={idx}
                        css={{ color: exportHexColorWidthLineName(item.parentLineId.toString()), marginRight: '8px' }}
                      >
                        {item.parentLineId}
                        {/* 
                        selected stations 중에 label이 존재하는 station과 일치하지않는다면
                        excludeListForAlreadySelectedLabel를 보여주고
                        아니면 defaultStationLabels를 보여준다. 
                        */}
                      </span>
                    ))}
                    <span css={{ marginLeft: '24px' }}>{highlightMatchKeyword(searchKeyword, station.label)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div css={submitWrap}>
          <button css={submitBtn} type="submit">
            다음
          </button>
        </div>
      </form>
    </Layout>
  );
}

const highlightMatchKeyword = (keyword: string, suggestion: string) => {
  const index = suggestion.indexOf(keyword);

  if (index !== -1) {
    const start = suggestion.slice(0, index);
    const match = suggestion.slice(index, index + keyword.length);
    const end = suggestion.slice(index + keyword.length);

    return (
      <>
        {start}
        <span css={{ color: 'rgb(196, 212, 252)' }}>{match}</span>
        {end}
      </>
    );
  }

  return suggestion;
};

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

// 1. click station (can be toggle)
// 2. show detail labels
// 3. select labels
// 4.

// is station active ?
// is label active ?
// remove label on another label list except not index that have selected labels
