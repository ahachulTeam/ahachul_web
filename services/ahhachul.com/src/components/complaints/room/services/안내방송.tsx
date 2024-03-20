import React, { useState } from 'react';

import { Flex, Text } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';

import ServiceBase from './ServiceBase';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';

function 안내방송(props: { page: COMPLAINTS_CONTENTS_TYPES }) {
  const { page } = props;

  const [isActiveSelected, setIsActiveSelected] = useState<string>();

  const handleSelect = (s: string) => () => setIsActiveSelected(s);

  const [isActiveSecondarySelected, setIsActiveSecondarySelected] = useState<string>();

  const handleSecondarySelect = (s: string) => () => setIsActiveSecondarySelected(s);

  return (
    <ServiceBase page={page}>
      <Flex align="center" style={{ width: '100%' }}>
        <Flex direction="column" style={{ width: '100%' }}>
          <Flex align="center" gap="12px" style={{ width: '100%' }}>
            {Object.entries(COMPLAINTS_ROOM_SERVICE_INFO[page].selectList).map(([key, val]) => {
              return (
                <Flex
                  key={key}
                  direction="column"
                  align="center"
                  justify="center"
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
                      borderRadius: '24px',
                      backgroundColor: COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].pointColor,
                      padding: '8px',
                    }}
                  >
                    선택
                  </Button>
                </Flex>
              );
            })}
          </Flex>
          <Flex direction="column" style={{ width: '100%', marginTop: '52px' }}>
            <Flex direction="column" gap="4px" style={{ marginBottom: '16px' }}>
              <Text
                fontSize="md"
                style={{
                  width: 'max-content',
                  color: '#171717',
                  fontWeight: 600,
                }}
              >
                요청사항
              </Text>
              <Text fontSize="sm" style={{ width: 'max-content', color: '#7B7B7B' }}>
                어떤 방송 음량이 문제인가요?
              </Text>
            </Flex>
            <Flex align="center" gap="12px" style={{ width: '100%' }}>
              {Object.entries(COMPLAINTS_ROOM_SERVICE_INFO[page].secondarySelectList!).map(([key, val]) => {
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
                        key === isActiveSecondarySelected
                          ? COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].backgroundColor
                          : '#F0F2F5',
                      boxShadow:
                        key === isActiveSecondarySelected
                          ? `inset 0px 0px 2px ${COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].borderColor}`
                          : 'none',
                      transition: 'background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                    }}
                    onClick={handleSecondarySelect(key)}
                  >
                    {COMPLAINTS_ROOM_SERVICE_INFO[page]?.iconList?.[key]}
                    <Flex direction="column" justify="center" gap="4px">
                      <Text
                        fontSize="lg"
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
                        borderRadius: '24px',
                        backgroundColor: COMPLAINTS_ROOM_SERVICE_INFO[page]?.activeColor?.[key].pointColor,
                        padding: '8px',
                      }}
                    >
                      선택
                    </Button>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ServiceBase>
  );
}

export default 안내방송;
