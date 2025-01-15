import { useMemo, useReducer, useCallback } from 'react';

import type { UserStation } from 'entities/@use-subway-context/model';
import { useUserStationStore } from 'entities/@use-subway-context/slice';
import { motion } from 'framer-motion';
import { from, tap, map } from 'rxjs';
import { ChevronIcon } from 'shared/static/icons/chevron';

import * as styles from './StationSelect.css';

const wrapperVariants = {
  open: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      stiffness: 300,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0, transition: { duration: 0.15 } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.15,
      when: 'afterChildren',
    },
  },
};

const actionTextVariants = {
  open: { scale: 1, y: 0, transition: { duration: 0.15 } },
  closed: { scale: 0, y: -7, transition: { duration: 0.15 } },
};

export const StationSelect = () => {
  const [openDialog, toggleDialog] = useReducer(open => !open, false); // https://github.com/streamich/react-use/pull/837
  const { stations, setUserStations } = useUserStationStore(state => state);
  const activatedStation = useMemo(() => stations[0], [stations]);

  const handleStationClick = useCallback(
    (clickedStation: UserStation) => () => {
      if (activatedStation.name === clickedStation.name) {
        toggleDialog();
        return;
      }

      from([clickedStation])
        .pipe(
          tap(() => toggleDialog()),
          map(clicked => [clicked, ...stations.filter(station => station.name !== clicked.name)]),
          tap(updatedStations => setUserStations(updatedStations)),
        )
        .subscribe();
    },
    [activatedStation.name, stations, setUserStations],
  );

  return (
    <div css={styles.container}>
      <motion.div css={{ position: 'relative' }} animate={openDialog ? 'open' : 'closed'}>
        <button css={styles.button} onClick={toggleDialog}>
          <span>{activatedStation.name}</span>
          <motion.span variants={iconVariants}>
            <ChevronIcon />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top' }}
          css={styles.menu}
        >
          {stations.map(station => (
            <Option key={station.name} station={station} onClick={handleStationClick(station)} />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};
const Option = ({ station, onClick }: { station: UserStation; onClick: () => void }) => {
  return (
    <motion.li variants={itemVariants} css={styles.option} onClick={onClick}>
      <motion.span variants={actionTextVariants}>{station.name}</motion.span>
    </motion.li>
  );
};
