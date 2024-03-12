import React, { useReducer } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';

import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { Layout } from 'components/layout';
import { WhereIsTrainNumberBottomSheet } from './bottomSheet';
import { vars } from '@ahhachul/themes';
import { tooltip, buttonWrapper } from './style';
import { useFlow } from 'stackflow';

type AskTrainNumberProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
};

const AskTrainNumber: ActivityComponentType<AskTrainNumberProps> = ({ params }) => {
  const { push } = useFlow();
  const [show, toggle] = useReducer((c) => !c, false);

  const next = () => {
    push('ComplaintsSubmission', { slug: params.slug });
  };

  return (
    <Layout activeTab={false} appBar={{ title: params.slug }} isDarkMode>
      <Box css={{ padding: '20px' }}>
        <Flex direction="column" gap="6px" css={{ marginBottom: '50px' }}>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            정확한 민원접수를 위해
          </Text>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            <b css={{ color: '#2EE477' }}>열차번호</b>를 입력해주세요
          </Text>
        </Flex>
      </Box>
      <div style={{ padding: '0 20px' }}>
        {/* <Input variant="filled" placeholder="열차번호" /> */}
        <span css={tooltip} onClick={toggle}>
          {/* <CircleWarningSVG /> */}
          <span style={{ color: '#ffffff' }}>열차번호는 어디에 있나요?</span>
        </span>
      </div>
      <WhereIsTrainNumberBottomSheet isShowing={show} onClose={toggle} />
      <div css={buttonWrapper}>
        <Button
          size="md"
          color="whiteAlpha"
          onClick={next}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: vars.colors.$static.dark.color.white,
          }}
        >
          다음
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color="blackAlpha"
          onClick={() => {}}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: vars.colors.$static.dark.color.white,
          }}
        >
          열차번호 없이 민원신고 하기
        </Button>
      </div>
    </Layout>
  );
};

export default AskTrainNumber;
