import React, { useState } from 'react';
import { Flex, Grid, Text } from '@ahhachul/react-components-layout';

import ServiceBase from './ServiceBase';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';

function 환경민원(props: { page: COMPLAINTS_CONTENTS_TYPES }) {
  const { page } = props;

  const [isActiveSelected, setIsActiveSelected] = useState<string>();

  const handleSelect = (s: string) => () => setIsActiveSelected(s);

  return (
    <ServiceBase page={page}>
      <Flex align="center" style={{ width: '100%' }}>
        <Grid templateColumns="repeat(3, 1fr)" gap="6px" style={{ width: '100%' }}>
          {Object.entries(COMPLAINTS_ROOM_SERVICE_INFO[page].selectList).map(([key]) => {
            return (
              <Flex
                key={key}
                direction="column"
                gap="16px"
                justify="center"
                style={{
                  aspectRatio: '1 / 1',
                }}
              >
                <Flex
                  as="button"
                  direction="column"
                  justify="center"
                  align="center"
                  style={{
                    height: '100%',
                    border: `1px solid ${key === isActiveSelected ? '#000' : '#E0E2EB'}`,
                    borderRadius: '8px',
                    backgroundColor: key === isActiveSelected ? '#EDFFF4' : '#FAFAFA',
                    transition: 'all 0.3s ease-in-out',
                  }}
                  onClick={handleSelect(key)}
                >
                  {COMPLAINTS_ROOM_SERVICE_INFO[page]?.iconList?.[key]}
                </Flex>
                <Text fontSize="md" style={{ fontWeight: 600 }}>
                  {key}
                </Text>
              </Flex>
            );
          })}
        </Grid>
      </Flex>
    </ServiceBase>
  );
}

export default 환경민원;
