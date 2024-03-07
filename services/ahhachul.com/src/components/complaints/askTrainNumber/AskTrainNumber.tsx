import React from 'react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';

import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { Layout } from 'components/layout';
import { tooltip } from './style';
import { ActivityComponentType } from '@stackflow/react';

type AskTrainNumberProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
};

const AskTrainNumber: ActivityComponentType<AskTrainNumberProps> = ({ params }) => {
  return (
    <Layout appBar={{ title: params.slug }} isDarkMode>
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
        <span css={tooltip} onClick={() => {}}>
          {/* <CircleWarningSVG /> */}
          <span style={{ color: '#ffffff' }} onClick={() => {}}>
            열차번호는 어디에 있나요?
          </span>
        </span>
      </div>
      {/* <div css={buttonWrapper}>
        <Button
          size="md"
          color="whiteAlpha"
          onClick={신고유형선택으로가기}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: vars.colors.$static.dark.color.black,
          }}
        >
          다음
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color="blackAlpha"
          // onClick={openSubwayLine모달}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'max-content',
            backgroundColor: vars.colors.$static.dark.color.white,
          }}
        >
          열차번호 없이 민원신고 하기
        </Button>
      </div> */}
    </Layout>
  );
};

export default AskTrainNumber;
