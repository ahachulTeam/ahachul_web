import { CSSObject } from '@emotion/react';
import { defaultFadeInVariants } from 'data/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { IComplaint } from 'types';
import { getDomainName, isIOS } from 'utils/appEnv';

const FloatBtn = ({
  id,
  lineName,
  complaintType,
  shortContent,
}: Pick<IComplaint, 'id' | 'shortContent' | 'complaintType'> & { lineName: string }) => {
  const phoneNumber = '1577-1234'; // 3호선 민원 번호
  const url = `${getDomainName()}/complaints/${id}`;
  const messageContent = `${lineName} ${complaintType}\n${shortContent}\n\n아하철에서 자세한 내용을 확인해주세요.\n\n${url}`;

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
  bottom: '32px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  background: 'rgb(196, 212, 252)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 22px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'rgb(65, 66, 89)',
};

export default FloatBtn;
