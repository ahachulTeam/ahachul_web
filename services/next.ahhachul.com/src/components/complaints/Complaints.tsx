import React from 'react';
import { Box } from '@ahhachul/react-components-layout';

import { ComplaintsComponent } from '@/src/components';
import { COMPLAINTS_CONTENTS } from '@/src/data/complaints';
import { grid1, grid2, wrap, pageTitle } from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from '@/src/data/motion';
import { useAppSelector } from '@/src/stores';
import Link from 'next/link';
import { PATH } from '@/src/data';

const Complaints = () => {
  const { activeView } = useAppSelector((state) => state.complaint);

  return (
    <AnimatePresence mode="wait">
      {activeView === 'SUBMISSION' && (
        <motion.main css={wrap} initial="initial" animate="animate" exit="exit" variants={defaultFadeInVariants}>
          <Box>
            <h2 css={pageTitle}>지하철 환경</h2>
            <ul css={grid1}>
              {Object.entries(COMPLAINTS_CONTENTS)
                .slice(0, 4)
                .map(([key, value]) => (
                  <li key={key}>
                    <Link href={PATH.complaintsAskTrainNumber}>
                      <ComplaintsComponent.ComplaintCard
                        title={value.label}
                        description={value.description}
                        icon={value?.icon}
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </Box>
          <Box>
            <h2 css={pageTitle}>긴급민원 요청</h2>
            <ul css={grid2}>
              {Object.entries(COMPLAINTS_CONTENTS)
                .slice(4, 7)
                .map(([key, value]) => (
                  <li key={key}>
                    <Link href={PATH.complaintsAskTrainNumber}>
                      <ComplaintsComponent.ComplaintCard
                        title={value.label}
                        description={value.description}
                        icon={value?.icon}
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </Box>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Complaints;
