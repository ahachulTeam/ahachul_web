import React from 'react';
import loadable from '@loadable/component';
import styled from '@emotion/styled';
import { vars } from '@ahhachul/themes';
import { Button } from '@ahhachul/react-components-button';
import { Flex, Text } from '@ahhachul/react-components-layout';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';

const AsyncRoomService = loadable((props: { page: unknown }) => import(`./services/${props.page}`), {
  cacheKey: (props) => props.page,
});

function 신고유형선택스텝({ slug }: { slug: COMPLAINTS_CONTENTS_TYPES }) {
  const 신고유형선택완료_완료스텝으로가기 = () => {};

  return (
    <>
      <Flex
        justify="center"
        align="center"
        gap="12px"
        style={{
          height: '85px',
          backgroundColor: '#242424',
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#01A9E6',
          }}
        >
          <Text fontSize="xs" style={{ color: 'white', fontWeight: 600 }}>
            1192
          </Text>
        </Flex>
        <Text fontSize="lg" style={{ color: 'white', fontWeight: 600 }}>
          대화행
        </Text>
      </Flex>
      <AsyncRoomService page={slug} />
      <ButtonWrap align="center" justify="center">
        <Button
          size="md"
          color="whiteAlpha"
          onClick={신고유형선택완료_완료스텝으로가기}
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
          민원접수
        </Button>
      </ButtonWrap>
    </>
  );
}

const ButtonWrap = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 20px 36px 20px;
  background-color: #fff;
`;

export default 신고유형선택스텝;
