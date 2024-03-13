import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { Button } from '@ahhachul/react-components-button';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { useFlow } from 'stackflow';
import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import completeVideo from 'static/videos/process-complete.mp4';

type ComplaintsCompleteProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
};

const ComplaintsComplete: ActivityComponentType<ComplaintsCompleteProps> = ({ params }) => {
  const { pop } = useFlow();

  const 돌아가기 = useCallback(() => {
    pop(3);
  }, []);

  const 접수내역확인페이지가기 = useCallback(() => {
    console.log('params:', params);
  }, []);

  return (
    <Layout activeTab={false} appBar={{ title: '' }} isDarkMode>
      <Box
        as="main"
        style={{
          backgroundColor: '#000',
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Flex
          direction="column"
          gap="30px"
          align="center"
          justify="center"
          style={{
            position: 'absolute',
            top: '140px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
          }}
        >
          <video autoPlay loop muted style={{ width: '100%', height: '184px' }}>
            <source src={completeVideo} />
          </video>
          <Text fontSize="2xl" style={{ color: '#fff', fontWeight: 600, width: '100%' }}>
            민원이 접수되었어요!
          </Text>
        </Flex>
        <ButtonGroup direction="column" align="center" justify="center" gap="16px">
          <Button
            size="md"
            color="blackAlpha"
            onClick={접수내역확인페이지가기}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              borderRadius: '8px',
              color: 'black',
              backgroundColor: '#EDEFF3',
            }}
          >
            접수내역 확인
          </Button>
          <Button
            size="md"
            color="whiteAlpha"
            onClick={돌아가기}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              borderRadius: '8px',
              color: 'black',
              backgroundColor: '#2EE477',
            }}
          >
            돌아가기
          </Button>
        </ButtonGroup>
      </Box>
    </Layout>
  );
};

const ButtonGroup = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 0;
  margin: 0 20px 50px 20px;
`;

export default ComplaintsComplete;
