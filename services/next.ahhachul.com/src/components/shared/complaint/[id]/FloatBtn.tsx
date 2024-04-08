import { CSSObject } from '@emotion/react';
import { COMPLAINTS_CONTENTS_TYPES } from '@/src/data/complaints';
import { defaultFadeInVariants } from '@/src/data/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { IComplaint } from '@/src/types';
import { getDomainName, isIOS } from '@/src/utils/appEnv';
import {
  exportLineNameWithSubwayLineId,
  formatComplaintShortContentToKoSentence,
  formatComplaintTypeToKoSentence,
} from '@/src/utils/export';

const FloatBtn = ({
  id,
  trainNo,
  subwayLineId,
  complaintType,
  shortContent,
}: Pick<IComplaint, 'id' | 'trainNo' | 'subwayLineId' | 'shortContent' | 'complaintType'>) => {
  const phoneNumber = '1577-1234'; // 3호선 민원 번호
  const url = `${getDomainName()}/complaints/${id}`;
  const messageContent = `차량번호 ${trainNo}\n${exportLineNameWithSubwayLineId(subwayLineId)} ${formatComplaintTypeToKoSentence(complaintType as COMPLAINTS_CONTENTS_TYPES)}\n${formatComplaintShortContentToKoSentence(shortContent)}\n\n아하철에서 자세한 내용을 확인해주세요.\n\n${url}`;

  const handleSendMessage = () => {
    let messageLink = '';
    if (isIOS()) {
      messageLink = `sms:${phoneNumber}&body=${encodeURIComponent(messageContent)}`;
    } else {
      messageLink = `sms:${phoneNumber}?body=${encodeURIComponent(messageContent)}`;
    }

    window.location.href = messageLink;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        css={floatCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={handleSendMessage}
      >
        {id && '민원 문자 보내기'}
      </motion.button>
    </AnimatePresence>
  );
};

const floatCss: CSSObject = {
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  background: 'rgb(196, 212, 252)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 22px',
  borderRadius: '22px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'rgb(65, 66, 89)',
};

export default FloatBtn;
