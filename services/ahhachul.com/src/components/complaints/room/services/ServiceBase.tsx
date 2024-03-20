import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';
import { css } from '@emotion/react';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';
import { Text } from '@ahhachul/react-components-layout';
import styled from '@emotion/styled';

function ServiceBase(props: { page: COMPLAINTS_CONTENTS_TYPES; children: React.ReactNode }) {
  const { page, children } = props;

  return (
    <Box
      css={css`
        padding: 48px 20px 128px;
      `}
    >
      <Flex direction="column" gap="4px" style={{ marginBottom: '24px' }}>
        <Text fontSize="md" style={{ color: '#ffffff', fontWeight: 600 }}>
          {COMPLAINTS_ROOM_SERVICE_INFO[page].title}
        </Text>
        <Text fontSize="sm" style={{ color: '#f7f7f7' }}>
          {COMPLAINTS_ROOM_SERVICE_INFO[page].subTitle}
        </Text>
      </Flex>
      {children}
      <Flex direction="column" gap="4px" style={{ marginTop: '40px' }}>
        <Text fontSize="md" fontWeight={600} style={{ color: '#ffffff' }}>
          내용
        </Text>
        <Text fontSize="xs" style={{ color: '#f7f7f7' }}>
          자세하게 작성해주시면 많은 도움이 돼요.
        </Text>
      </Flex>
      <TextareaWrapper>
        <Textarea
          placeholder={'내용을 입력해주세요 (500자 이내)\n*서비스 정책에 맞지 않을 경우 자동으로 처리 될 수 있습니다.'}
        />
      </TextareaWrapper>
    </Box>
  );
}

const TextareaWrapper = styled.div`
  width: 100%;
  padding: 25px 0 50px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  border: none;
  outline: none;
  padding: 0;
  font-family: 'Pretendard';
  font-size: 14px;
  color: #ffffff;
  background-color: #1f1f1f;
  padding: 24px 8px 24px 16px;
  border-radius: 16px;
  resize: none;

  &::placeholder {
    color: #bec1cb;
    line-height: 2;
    font-family: 'Pretendard';
  }
`;

export default ServiceBase;
