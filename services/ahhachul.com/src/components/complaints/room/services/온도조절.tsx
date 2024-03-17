import React, { useState } from 'react';

import { Flex, Text } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';

import ServiceBase from './ServiceBase';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';

function 온도조절(props: { page: COMPLAINTS_CONTENTS_TYPES }) {
  const { page } = props;

  const [isActiveSelected, setIsActiveSelected] = useState<string>();

  const handleSelect = (s: string) => () => setIsActiveSelected(s);

  return (
    <ServiceBase page={page}>
      <Flex align="center" gap="12px" style={{ width: '100%' }}>
        {Object.entries(COMPLAINTS_ROOM_SERVICE_INFO[page].selectList).map(([key, val]) => {
          return (
            <Flex
              key={key}
              direction="column"
              justify="center"
              align="center"
              gap="20px"
              style={{
                padding: '22px 0',
                width: 'calc(50% - 5px)',
                borderRadius: '27px',
                backgroundColor:
                  key === isActiveSelected
                    ? COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].backgroundColor
                    : '#F0F2F5',
                boxShadow:
                  key === isActiveSelected
                    ? `inset 0px 0px 2px ${COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].borderColor}`
                    : 'none',
                transition: 'background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              }}
              onClick={handleSelect(key)}
            >
              {COMPLAINTS_ROOM_SERVICE_INFO[page]?.iconList?.[key]}
              <Flex direction="column" justify="center" gap="4px">
                <Text
                  fontSize="md"
                  style={{
                    fontWeight: 600,
                    color: COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].pointColor,
                  }}
                >
                  {key}
                </Text>
                <Text
                  fontSize="xs"
                  style={{
                    color: COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].pointColor,
                    opacity: 0.6,
                  }}
                >
                  {val.split('/')[val.split('/').length - 1]}
                </Text>
              </Flex>
              <Button
                size="md"
                style={{
                  width: 'max-content',
                  margin: '0 auto',
                  borderRadius: '100px',
                  backgroundColor: COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].pointColor,
                }}
              >
                선택
              </Button>
            </Flex>
          );
        })}
      </Flex>
    </ServiceBase>
  );
}

export default 온도조절;
