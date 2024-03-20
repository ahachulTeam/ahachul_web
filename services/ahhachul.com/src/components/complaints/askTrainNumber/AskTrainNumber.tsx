import React, { useReducer } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { Button } from '@ahhachul/react-components-button';
import { Input } from '@ahhachul/react-components-input';

import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { Layout } from 'components/layout';
import { WhereIsTrainNumberBottomSheet } from './bottomSheet';
import { tooltip, buttonWrapper } from './style';
import { useFlow } from 'stackflow';
import { f, theme } from 'styles';
import IconInfo from 'static/icons/system/IconInfo';

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
    <Layout activeTab={false} appBar={{ title: params.slug }}>
      <Box as="main" css={{ padding: '20px' }}>
        <Flex direction="column" gap="6px" css={{ marginBottom: '50px' }}>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            정확한 민원접수를 위해
          </Text>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            <b css={{ color: '#2EE477' }}>열차번호</b>를 입력해주세요
          </Text>
        </Flex>
      </Box>
      <div css={{ padding: '0 20px' }}>
        <Input
          variant="filled"
          placeholder="열차번호"
          placeholderColor="#C3C3C3"
          style={{ borderBottom: '1px solid #ffffff', width: '100%', paddingBottom: '12px' }}
        />
        <span css={tooltip} onClick={toggle}>
          <IconInfo
            css={{
              '& > svg > path:first-of-type': {
                stroke: '#67696F',
              },
            }}
          />
          <span css={{ color: theme.color.scale.gray[1000], cursor: 'pointer' }}>열차번호는 어디에 있나요?</span>
        </span>
      </div>
      <WhereIsTrainNumberBottomSheet isShowing={show} onClose={toggle} />
      <div css={buttonWrapper}>
        <Button
          size="md"
          color={theme.color.scale.gray[1000]}
          onClick={next}
          css={[
            f.fullWidth,
            f.flexAlignCenter,
            f.flexJustifyCenter,
            {
              height: '48px',
              borderRadius: theme.layout.radii.lg,
              backgroundColor: theme.color.scale.gray[0],
            },
          ]}
        >
          다음
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color={theme.color.scale.gray[1000]}
          css={[
            f.fullWidth,
            f.flexAlignCenter,
            f.flexJustifyCenter,
            {
              height: '48px',
              borderRadius: theme.layout.radii.lg,
              backgroundColor: theme.color.scale.gray[0],
            },
          ]}
        >
          열차번호 없이 민원신고 하기
        </Button>
      </div>
    </Layout>
  );
};

export default AskTrainNumber;
