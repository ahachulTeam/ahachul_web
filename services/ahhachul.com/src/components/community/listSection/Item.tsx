import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconBookmark from 'static/icons/system/IconBookmark';
import IconComment from 'static/icons/system/IconComment';
import IconEye from 'static/icons/system/IconEye';
import IconHeart from 'static/icons/system/IconHeart';

function Item() {
  return (
    <li>
      <Box
        as="article"
        background="gray"
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
        }}
      >
        <button
          // href={!router.query.slug ? `/talk/rank/1` : `/talk/1`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            padding: '22px',
            borderBottom: '1px solid #F4F5F8',
          }}
        >
          <Flex align="center">
            <Text fontSize="sm" as="p" color="gray" style={{ fontWeight: 700 }}>
              🔥 자유
            </Text>
          </Flex>
          <Flex direction="column" gap="14px">
            <Flex direction="column">
              <Text fontSize="sm" as="p" style={{ fontWeight: 700, marginBottom: '6px' }}>
                고졸로 1년만에 개발자고졸로 1년만에 개발자고졸로 ...
              </Text>
              <Text fontSize="sm" as="pre" style={{ marginBottom: '8px' }}>
                {`개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요`}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text fontSize="sm" as="span" color="gray">
                #개발 #취준
              </Text>
              <Text fontSize="sm" as="span" color="gray">
                00시간전
              </Text>
            </Flex>
          </Flex>
        </button>
        <Flex align="center" justify="space-between" style={{ height: '56px', padding: '0 30px' }}>
          <Flex align="center" gap="12px">
            <Flex align="center" gap="2px">
              <IconEye css={{ width: '20px' }} />
              <Text fontSize="sm">1</Text>
            </Flex>
            <Flex align="center" gap="2px">
              <IconHeart css={{ width: '20px' }} />
              <Text fontSize="sm">1</Text>
            </Flex>
            <Flex align="center" gap="2px">
              <IconComment css={{ width: '20px' }} />
              <Text fontSize="sm">1</Text>
            </Flex>
          </Flex>
          <IconBookmark />
        </Flex>
      </Box>
    </li>
  );
}

export default Item;
