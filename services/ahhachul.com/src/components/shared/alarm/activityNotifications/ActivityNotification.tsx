import { Flex, Text } from '@ahhachul/react-components-layout';
import IconAlarmTalk from 'static/icons/system/IconAlarmTalk';
import IconAlarmComplaint from 'static/icons/system/IconAlarmComplaint';

function ActivityNotification(props: { type: 'talk' | 'complaints' }) {
  const { type } = props;

  return (
    <Flex direction="column" gap="12px" style={{ padding: '30px 20px', borderBottom: '1px solid #F5F5F5' }}>
      <Flex align="center" gap="8px" style={{ position: 'relative' }}>
        {type === 'talk' ? <IconAlarmTalk /> : <IconAlarmComplaint />}
        <Text fontSize="xs" style={{ color: '#999999' }}>
          {type === 'talk' ? '커뮤니티' : '민원신청'}
        </Text>
        <Text
          fontSize="xs"
          style={{
            color: '#999999',
            fontWeight: 500,
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          1시간전
        </Text>
      </Flex>
      <Flex direction="column" gap="30px" style={{ paddingLeft: '24px' }}>
        <Flex
          direction="column"
          gap="6px"
          style={{
            borderRadius: '6px',
            position: 'relative',
          }}
        >
          <Text fontSize="md" style={{ color: '#3D3D3D', fontWeight: 500 }}>
            작성하신 게시물에 댓글이 달렸어요
          </Text>
          <Text fontSize="sm" style={{ color: '#999999' }}>
            2호선 게시판: 제목이름제목이름제목이름제목이제목이...
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ActivityNotification;
