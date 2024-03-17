import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'components/layout';
// import loadable from '@loadable/component';
import styled from '@emotion/styled';
import { vars } from '@ahhachul/themes';
import { Button } from '@ahhachul/react-components-button';
import { Flex, Text } from '@ahhachul/react-components-layout';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';
import { useFlow } from 'stackflow';
import loadable from '@loadable/component';

type ComplaintsSubmissionProps = {
  slug: COMPLAINTS_CONTENTS_TYPES;
};

const AsyncRoomService = loadable(
  (props: { page: COMPLAINTS_CONTENTS_TYPES }) => import(`../room/services/${props.page}`),
  {
    cacheKey: (props) => props.page,
  },
);

const ComplaintsSubmission: ActivityComponentType<ComplaintsSubmissionProps> = ({ params }) => {
  const { push } = useFlow();
  const next = () => {
    push('ComplaintsComplete', { slug: params.slug });
  };

  return (
    <Layout activeTab={false} appBar={{ title: params.slug }}>
      <Flex
        as="main"
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
      <AsyncRoomService page={params.slug} />
      <ButtonWrap align="center" justify="center" style={{ backgroundColor: vars.colors.$static.dark.color.black }}>
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
            color: vars.colors.$static.dark.color.black,
            backgroundColor: vars.colors.$static.dark.color.white,
          }}
        >
          민원접수
        </Button>
      </ButtonWrap>
    </Layout>
  );
};

const ButtonWrap = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 20px 36px 20px;
`;

export default ComplaintsSubmission;
