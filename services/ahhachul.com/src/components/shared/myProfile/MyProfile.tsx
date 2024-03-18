import React from 'react';
import { Flex, Text, Divider } from '@ahhachul/react-components-layout';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import IconEdit from 'static/icons/system/IconEdit';
import IconFancyArrow from 'static/icons/system/IconFancyArrow';
import IconCirclePlus from 'static/icons/system/IconCirclePlus';
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
            height: '74px',
          }}
        >
          <Text fontSize="md" style={{ fontWeight: 600, color: 'white' }}>
            createhb21
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
              backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(263deg, #50BEFD 0%, #2EE477 100%)',
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
                color: '#ffffff',
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
        <Divider size={16} style={{ borderColor: '#fff' }} />
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
              height: '40px',
              padding: '0 20px',
              width: '100%',
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
              MY 지하철
            </Text>
            <Text fontSize="sm" style={{ color: '#ffffff', fontWeight: 500 }}>
              추가하기
            </Text>
          </Flex>
          <Flex
            justify="center"
            align="center"
            gap="8px"
            style={{
              height: '94px',
              width: '100%',
            }}
          >
            <IconCirclePlus />
            <Text
              fontSize="md"
              style={{
                fontWeight: 400,
                color: '#ffffff',
              }}
            >
              자주 방문하는 <b style={{ color: '#ffffff', fontWeight: 600 }}>역과 호선을 선택</b> 해주세요.
            </Text>
          </Flex>
        </Flex>
        <Divider size={30} style={{ borderColor: '#fff' }} />
        <Flex
          align="center"
          style={{
            height: '40px',
            padding: '0 20px',
            width: '100%',
          }}
        >
          <Text
            fontSize="md"
            style={{
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            내 활동
          </Text>
        </Flex>
      </main>
    </Layout>
  );
};

export default MyProfile;
