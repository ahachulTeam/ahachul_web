import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';
import { css } from '@emotion/react';
import { COMPLAINTS_CONTENTS_TYPES, COMPLAINTS_ROOM_SERVICE_INFO } from 'data/complaints';
import { Text } from '@ahhachul/react-components-layout';
import styled from '@emotion/styled';

function ServiceBase(props: { page: COMPLAINTS_CONTENTS_TYPES; children: React.ReactNode }) {
  const { page, children } = props;

  return (
    <>
      <Box
        css={css`
          padding: 68px 20px 24px;
        `}
      >
        <Flex direction="column" gap="4px" style={{ marginBottom: '24px' }}>
          <Text fontSize="md" style={{ color: '#171717', fontWeight: 600 }}>
            {COMPLAINTS_ROOM_SERVICE_INFO[page].title}
          </Text>
          <Text fontSize="sm" style={{ color: '#7B7B7B' }}>
            {COMPLAINTS_ROOM_SERVICE_INFO[page].subTitle}
          </Text>
        </Flex>
        {children}
        <Flex
          align="center"
          gap="8px"
          style={{
            width: '100%',
            borderRadius: '10px',
            height: '46px',
            padding: '0 20px',
            marginTop: '24px',
            backgroundColor: '#F6F7F9',
            boxSizing: 'border-box',
          }}
        >
          {/* <ResetButton ItemComponent={<PhoneSVG />} onClick={() => {}} /> */}
          <Text fontSize="sm" style={{ color: '#000' }}>
            콜센터로 바로 연결하기
          </Text>
        </Flex>
        <Flex direction="column" gap="4px" style={{ marginTop: '40px' }}>
          <Text fontSize="md" style={{ color: '#171717', fontWeight: 600 }}>
            내용
          </Text>
          <Text fontSize="sm" style={{ color: '#7B7B7B' }}>
            자세하게 작성해주시면 많은 도움이 돼요.
          </Text>
        </Flex>
        <TextareaWrapper>
          <Textarea
            placeholder={
              '내용을 입력해주세요 (500자 이내)\n*서비스 정책에 맞지 않을 경우 자동으로 처리 될 수 있습니다.'
            }
          />
        </TextareaWrapper>
      </Box>
      {/* <콜센터연결모달 isShowing={isModalOpen} onClose={closeHandler} /> */}
    </>
  );
}

const TextareaWrapper = styled.div`
  width: 100%;
  padding: 25px 0 50px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  outline: none;
  padding: 0;
  font-family: 'Pretendard';
  font-size: 14px;
  color: #171717;

  &::placeholder {
    color: #bec1cb;
    line-height: 2;
    font-family: 'Pretendard';
  }
`;

export default ServiceBase;
