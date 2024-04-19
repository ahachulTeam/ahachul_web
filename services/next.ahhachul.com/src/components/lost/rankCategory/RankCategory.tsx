import { Flex, Box, Text } from '@ahhachul/react-components-layout';
import bagImg from '@/src/static/img/lost/bag.png';
import galaxyImg from '@/src/static/img/lost/galaxy.png';
import iphoneImg from '@/src/static/img/lost/iphone.png';
import walletImg from '@/src/static/img/lost/wallet.png';

const RANK_CATEGORY = {
  iphone: {
    label: '아이폰',
    img: iphoneImg,
  },
  galaxy: {
    label: '갤럭시',
    img: galaxyImg,
  },
  wallet: {
    label: '지갑',
    img: walletImg,
  },
  bag: {
    label: '가방',
    img: bagImg,
  },
};

function RankCategory() {
  return (
    <Flex direction="column" gap="20px" style={{ padding: '16px 0' }}>
      <Text fontSize="md" style={{ fontWeight: '600' }}>
        인기 분실물 TOP 4
      </Text>
      <Flex align="center" gap="16px">
        {Object.entries(RANK_CATEGORY).map(([key, value]) => {
          return (
            <Flex key={key} direction="column" align="center" gap="8px">
              <Box
                style={{
                  width: '58px',
                  height: '58px',
                  position: 'relative',
                  borderRadius: '50%',
                  border: '1px solid #EDEFF3',
                }}
              >
                {/* <img
                  alt=""
                  src={value.img}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                /> */}
              </Box>
              <Text fontSize="xs" style={{ color: 'white' }}>
                {value.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default RankCategory;
