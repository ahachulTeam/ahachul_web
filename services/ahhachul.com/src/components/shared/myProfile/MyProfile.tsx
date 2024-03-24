import React from 'react';
import { Flex, Text, Divider } from '@ahhachul/react-components-layout';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import IconEdit from 'static/icons/system/IconEdit';
import IconFancyArrow from 'static/icons/system/IconFancyArrow';
import { wrap } from './style';

const MyProfile: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '마이 프로필',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <Flex
          align="center"
          justify="space-between"
          style={{
            width: '100%',
            marginBottom: '6px',
          }}
        >
          <Text fontSize="md" style={{ fontWeight: 600, color: 'white' }}>
            이효범
          </Text>
          <IconEdit />
        </Flex>
        <Flex
          as="button"
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '76px',
            marginBottom: '12px',
          }}
        >
          <Flex
            align="center"
            gap="6px"
            style={{
              position: 'relative',
              width: '100%',
              height: '46px',
              borderRadius: '15px',
              border: '1.5px solid transparent',
              backgroundImage: 'linear-gradient(#697183, #697183), linear-gradient(263deg, #50BEFD 0%, #2EE477 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box',
            }}
          >
            <Text
              fontSize="sm"
              style={{
                color: '#ffffff',
                fontWeight: 600,
                paddingLeft: '16px',
                lineHeight: '130%',
                letterSpacing: '-0.56px',
              }}
            >
              접수한 민원
            </Text>
            <Text
              fontSize="sm"
              style={{
                color: '#697183',
                fontWeight: 600,
                lineHeight: '130%',
                letterSpacing: '-0.98px',
              }}
            >
              3
            </Text>
            <IconFancyArrow
              css={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </Flex>
        </Flex>
        <Divider size={1} style={{ borderColor: '#9da5b6' }} />
        <Flex
          direction="column"
          style={{
            width: '100%',
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{
              marginTop: '12px',
              height: '40px',
              width: '100%',
              marginBottom: '12px',
            }}
          >
            <Text
              fontSize="md"
              style={{
                color: '#ffffff',
                fontWeight: 600,
                width: 'max-content',
              }}
            >
              즐겨찾는 역
            </Text>
            <Text fontSize="xs" style={{ color: '#9da5b6', fontWeight: 500 }}>
              추가하기
            </Text>
          </Flex>
          <Flex
            align="center"
            gap="8px"
            style={{
              width: '100%',
            }}
          >
            <Text
              fontSize="md"
              style={{
                fontWeight: 400,
                color: '#697183',
              }}
            >
              자주 방문하는 <b style={{ color: '#ffffff', fontWeight: 600 }}>역과 호선을 선택</b> 해주세요.
            </Text>
          </Flex>
        </Flex>
      </main>
    </Layout>
  );
};

export default MyProfile;
