import React from 'react';
import { vars } from '@ahhachul/themes';
import { Button } from '@ahhachul/react-components-button';
import { Flex, Box, Text } from '@ahhachul/react-components-layout';

import { BottomSheet } from '@/src/components/ui';

interface WhereIsTrainNumberBottomSheetProps {
  isShowing: boolean;
  onClose: VoidFunction;
}

function WhereIsTrainNumberBottomSheet({ isShowing, onClose }: WhereIsTrainNumberBottomSheetProps) {
  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <Flex as="section" direction="column" style={{ width: '100%', paddingTop: '45px', paddingBottom: '30px' }}>
        <Box
          style={{
            width: '100%',
            height: '152px',
            background: '#efefef',
            position: 'relative',
            marginBottom: '20px',
          }}
        ></Box>
        <Flex direction="column" align="center" gap="10px" style={{ width: '100%', marginBottom: '48px' }}>
          <Text as="p" fontSize="2xl" style={{ fontSize: '22px', fontWeight: 600 }}>
            출입문 상단 또는 통로상단에!
          </Text>
          <Text as="pre" fontSize="md" style={{ fontWeight: 500, color: '#7F8084', lineHeight: '145%' }}>
            {'열차 내 출입문 상단 또는 통로 상단\n4~6자리 열차 번호가 있습니다.'}
          </Text>
        </Flex>
        <Button
          size="md"
          color="whiteAlpha"
          onClick={onClose}
          style={{
            width: 'calc(100% - 40px)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: vars.colors.$static.dark.color.black,
          }}
        >
          확인
        </Button>
      </Flex>
    </BottomSheet>
  );
}

export default WhereIsTrainNumberBottomSheet;
