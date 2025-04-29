import { useMemo, useReducer, useCallback, useRef } from 'react';

import { motion } from 'motion/react';
import { from, tap, map } from 'rxjs';

import { ChevronIcon } from '@/assets/icons/system';
import { useNativeBridge } from '@/contexts';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useUserFavoriteStations } from '@/services/user';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import type { UserStation } from '@/types';

import * as S from './HomeHeaderActions.styled';

const wrapperVariants = {
  open: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0,
      stiffness: 300,
      damping: 24,
      when: 'beforeChildren',
      staggerChildren: 0.02,
      duration: 0.15,
    },
  },
  closed: {
    scaleX: 0.7,
    scaleY: 0.7,
    opacity: 0,

    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.4,
      staggerChildren: 0.3,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0, transition: { duration: 0 } },
};

const Option = ({
  station,
  className,
  onClick,
}: {
  station: UserStation;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <li css={S.option} className={className} onClick={onClick}>
      <span>{station.stationName}</span>
    </li>
  );
};

const HomeHeaderActions = () => {
  const { push } = useFlow();
  const { bridge, isBridgeInitialized } = useNativeBridge();
  const [openDialog, toggleDialog] = useReducer(open => !open, false);

  const dialogRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef, () => {
    if (!openDialog) return;
    toggleDialog();
  });

  const { mutate: updateUserStations } = useUserFavoriteStations();
  const { userStations } = useUserStationStore(state => state);
  const activatedStation = useMemo(() => userStations[0], [userStations]);

  const handleStationClick = useCallback(
    (clickedStation: UserStation) => () => {
      if (!openDialog) return;
      if (activatedStation.stationName === clickedStation.stationName) {
        toggleDialog();
        return;
      }

      if (isBridgeInitialized) {
        bridge.send.haptic();
      }

      from([clickedStation])
        .pipe(
          tap(() => toggleDialog()),
          map(clicked => [
            clicked,
            ...userStations.filter(station => station.stationName !== clicked.stationName),
          ]),
          tap(updatedStations => {
            const req = updatedStations.map(item => ({
              label: item.label,
              stationName: item.stationName,
            }));
            updateUserStations(req);
          }),
        )
        .subscribe();
    },
    [activatedStation.stationName, openDialog, userStations],
  );

  const handleClickFavoriteStationSetting = () => {
    isBridgeInitialized && bridge.send.haptic();
    toggleDialog();
    setTimeout(() => {
      push('SettingPage', []);
    }, 550);
  };

  return (
    <div css={S.container} ref={dialogRef}>
      <button css={S.button} onClick={toggleDialog}>
        <span>{activatedStation.stationName}</span>
        <motion.span variants={iconVariants}>
          <ChevronIcon />
        </motion.span>
      </button>
      <motion.div
        animate={openDialog ? 'open' : 'closed'}
        css={{
          pointerEvents: openDialog ? 'unset' : 'none',
          position: 'relative',
        }}
      >
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{
            originY: 'top',
          }}
          css={S.menu}
        >
          {userStations.map((station, idx) => (
            <Option
              key={station.stationName}
              station={station}
              css={{
                color: idx === 0 ? '#272727' : '#95979F',
              }}
              onClick={handleStationClick(station)}
            />
          ))}
          <li css={S.option} onClick={handleClickFavoriteStationSetting}>
            <span css={{ color: '#95979F' }}>즐겨찾는역 설정하기</span>
          </li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default HomeHeaderActions;
