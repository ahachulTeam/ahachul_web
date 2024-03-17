import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import IconChat from 'static/icons/system/IconChat';

function Item() {
  return (
    <li>
      <Box
        as="article"
        style={{
          padding: '18px 0',
          borderBottom: '1px solid #F4F5F8',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Flex direction="column" gap="16px" style={{ width: '100%' }}>
            <Flex direction="column" gap="6px">
              <Text fontSize="sm" as="p" style={{ fontWeight: 600 }}>
                초록생 지갑을 발견
              </Text>
              <Text
                fontSize="sm"
                style={{
                  color: '#393A3E',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textAlign: 'left',
                }}
              >
                {`개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요`}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Flex>
                <Text fontSize="sm" as="span" style={{ color: 'white' }}>
                  1분 전
                </Text>
              </Flex>
              <Flex align="center">
                <IconChat />
                <Text fontSize="xs" style={{ color: '#7F8088', fontWeight: 500 }}>
                  1
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </button>
      </Box>
    </li>
  );
}

export default Item;
