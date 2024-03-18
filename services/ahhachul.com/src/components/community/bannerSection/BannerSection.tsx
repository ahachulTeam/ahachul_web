import { Box, Flex, Text } from '@ahhachul/react-components-layout';

function BannerSection() {
  return (
    <Box as="section" style={{ padding: '32px 0' }}>
      <Box
        as="article"
        style={{
          background: 'linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)',
          borderRadius: '10px',
        }}
      >
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <Flex align="center">
            <Text fontSize="sm" as="p" color="white" style={{ fontWeight: 700, marginBottom: '6px' }}>
              🔥 자유
            </Text>
          </Flex>
          <Flex direction="column">
            <Text
              fontSize="md"
              as="p"
              color="white"
              style={{ fontWeight: 700, marginBottom: '6px', textAlign: 'left' }}
            >
              고졸로 1년만에 개발자고졸로 1년만에 개발자고졸로 ...
            </Text>
            <Text fontSize="sm" color="white" style={{ marginBottom: '8px', textAlign: 'left' }}>
              {`개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요\n개발자 취준은 대학을 안 가는 것이 더 낫다고 생각해요`}
            </Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text fontSize="sm" as="span" color="white">
              #해시태그 #해시태그 #해시태그
            </Text>
          </Flex>
        </button>
      </Box>
    </Box>
  );
}

export default BannerSection;
