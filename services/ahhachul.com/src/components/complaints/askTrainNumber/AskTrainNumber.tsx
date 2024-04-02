import React, { useReducer, useRef } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';

import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { Layout } from 'components/layout';
import { WhereIsTrainNumberBottomSheet } from './bottomSheet';
import { submitWrap, submitBtn } from './style';
import { useFlow } from 'stackflow';
import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';
import IconChevron from 'static/icons/system/IconChevron';
import { useDispatch } from 'react-redux';
import { addSnackBar } from 'stores/ui';

type AskTrainNumberProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
};

const AskTrainNumber: ActivityComponentType<AskTrainNumberProps> = ({ params }) => {
  const { push } = useFlow();
  const [show, toggle] = useReducer((c) => !c, false);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const next = () => {
    if (!inputRef.current.value) {
      dispatch(addSnackBar({ message: '열차번호를 입력해주세요', posBottom: 115 }));
    } else {
      push('ComplaintsSubmission', { slug: params.slug, trainNumber: inputRef.current.value });
    }
  };

  return (
    <Layout activeTab={false} appBar={{ title: params.slug }}>
      <Box as="main" css={{ padding: '20px' }}>
        <Flex direction="column" gap="6px" css={{ marginBottom: '16px' }}>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            정확한 민원접수를 위해
          </Text>
          <Text fontSize="lg" css={{ color: '#ffffff !important' }}>
            <b css={{ color: '#2EE477' }}>열차번호</b>를 입력해주세요
          </Text>
        </Flex>
      </Box>
      <div css={section}>
        <span>열차번호</span>
        <input ref={inputRef} placeholder="열차번호" />
        <button>
          <span>열차번호 없이 민원신고 하기</span>
          <IconChevron />
        </button>
      </div>
      <div css={submitWrap}>
        <button css={submitBtn} onClick={next}>
          다음
        </button>
      </div>
      <WhereIsTrainNumberBottomSheet isShowing={show} onClose={toggle} />
    </Layout>
  );
};

const section: [CSSObject, CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.sideGutter,
  f.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#ffffff',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },
    },

    '& > button': {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'rgb(196, 212, 252, 0.7)',
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
      marginTop: '16px',

      '& > div > svg > path': {
        '&:first-of-type': {
          stroke: 'rgb(196, 212, 252, 0.7)',
        },
      },
    },
  }),
];

export default AskTrainNumber;
