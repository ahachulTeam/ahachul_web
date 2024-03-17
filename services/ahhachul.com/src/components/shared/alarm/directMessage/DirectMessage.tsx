import { Flex, Text } from '@ahhachul/react-components-layout';

function DirectMessage() {
  return (
    <Flex direction="column" gap="12px" style={{ padding: '20px', borderBottom: '1px solid #F5F5F5' }}>
      <Flex align="center" gap="8px" style={{ position: 'relative' }}>
        <Text fontSize="md" style={{ color: '#242424', fontWeight: 600 }}>
          CHULSOO123
        </Text>
        <Text
          fontSize="xs"
          style={{
            color: '#b1b1b1',
            fontWeight: 500,
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          오후 3:00
        </Text>
      </Flex>
      <Flex
        direction="column"
        gap="6px"
        style={{
          borderRadius: '6px',
          position: 'relative',
          paddingRight: '50px',
        }}
      >
        <Text fontSize="sm" style={{ color: '#535457' }}>
          안녕하세요. 올려주신 지갑 제가 4호선에서 분실한 것 같은데 혹시 어디 거주하시나요?
        </Text>
        <Text
          fontSize="xs"
          style={{
            fontWeight: 500,
            height: '20px',
            width: '20px',
            background: '#171717',
            borderRadius: '50%',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          1
        </Text>
      </Flex>
    </Flex>
  );
}

export default DirectMessage;
