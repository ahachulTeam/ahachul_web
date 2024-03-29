import React from 'react';
import loadable from '@loadable/component';
import { Box } from '@ahhachul/react-components-layout';

import { useFlow } from 'stackflow';
import { ComplaintsComponent } from 'components';
import { COMPLAINTS_CONTENTS, COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { grid, grid2, wrap, sectionLabel } from './style';

const Room = (serviceName: string) => {
  return loadable(() => import(`./room/services/${serviceName}`), {
    cacheKey: () => serviceName,
  });
};

const Complaints = () => {
  const { push } = useFlow();
  const next = (slug: string) => {
    push('AskTrainNumber', { slug: slug as COMPLAINTS_CONTENTS_TYPES });
  };

  return (
    <main css={wrap}>
      <Box>
        <h2 css={sectionLabel}>지하철 환경</h2>
        <ul css={grid}>
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(0, 4)
            .map(([key, value]) => (
              <li key={key} onMouseOver={() => Room(key).preload()} onClick={() => next(key)}>
                <ComplaintsComponent.ComplaintCard
                  title={value.label}
                  description={value.description}
                  icon={value?.icon}
                />
              </li>
            ))}
        </ul>
      </Box>
      <Box>
        <h2 css={sectionLabel}>긴급민원 요청</h2>
        <ul css={grid2}>
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(4, 7)
            .map(([key, value]) => (
              <li key={key} onMouseOver={() => Room(key).preload()} onClick={() => next(key)}>
                <ComplaintsComponent.ComplaintCard
                  title={value.label}
                  description={value.description}
                  icon={value?.icon}
                />
              </li>
            ))}
        </ul>
      </Box>
    </main>
  );
};

export default Complaints;
