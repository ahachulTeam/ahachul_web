import React from 'react';
import loadable from '@loadable/component';
import { Box, Grid, Text } from '@ahhachul/react-components-layout';

import { useFlow } from 'stackflow';
import { ComplaintsComponent } from 'components';
import { COMPLAINTS_CONTENTS, COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { grid, wrap, sectionLabel } from './style';

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
        <Text fontSize="md" css={sectionLabel}>
          지하철 환경
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" css={grid}>
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(0, 4)
            .map(([key, value]) => (
              <article key={key} onMouseOver={() => Room(key).preload()} onClick={() => next(key)}>
                <ComplaintsComponent.ComplaintCard title={value.label} description={value.description} />
              </article>
            ))}
        </Grid>
      </Box>
      <Box>
        <Text fontSize="xl" css={sectionLabel}>
          긴급민원 요청
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" css={grid}>
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(4, 7)
            .map(([key, value]) => (
              <article key={key} onMouseOver={() => Room(key).preload()} onClick={() => next(key)}>
                <ComplaintsComponent.ComplaintCard title={value.label} description={value.description} />
              </article>
            ))}
        </Grid>
      </Box>
    </main>
  );
};

export default Complaints;
