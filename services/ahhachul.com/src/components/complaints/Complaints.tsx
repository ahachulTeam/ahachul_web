import React from 'react';
import { Box } from '@ahhachul/react-components-layout';

import { Link } from 'stackflow';
import { ComplaintsComponent } from 'components';
import { COMPLAINTS_CONTENTS, COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_CONTENTS_VALUE_TYPES } from 'data/complaints';
import { grid1, grid2, wrap, pageTitle } from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from 'data/motion';
import { useAppSelector } from 'stores';

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
                .map(([key, value]: [COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_CONTENTS_VALUE_TYPES]) => (
                  <li key={key}>
                    <Link activityName="AskTrainNumber" activityParams={{ slug: key }}>
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
                .map(([key, value]: [COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_CONTENTS_VALUE_TYPES]) => (
                  <li key={key}>
                    <Link activityName="AskTrainNumber" activityParams={{ slug: key }}>
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
