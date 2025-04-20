import { UiComponent } from '@/components';
import { getSubwayComplaintCallNumber, subwayLineOptions } from '@/constants';
import { useNativeBridge } from '@/contexts';
import { useUser } from '@/hooks/domain';
import type { ComplaintType, ShortComplaintType } from '@/types/complaint';
import { getSharePageURL } from '@/utils/share';

const formatComplaintTypeToKoSentence = (complaintType?: ComplaintType) => {
  if (!complaintType) return;

  switch (complaintType) {
    case 'ENVIRONMENTAL_COMPLAINT':
      return '환경 민원이 발생했어요.';
    case 'TEMPERATURE_CONTROL':
      return '온도조절 민원이 발생했어요.';
    case 'DISORDER':
      return '질서저해 민원이 발생했어요.';
    case 'ANNOUNCEMENT':
      return '안내방송 민원이 발생했어요.';
    case 'EMERGENCY_PATIENT':
      return '응급환자 민원이 발생했어요.';
    case 'VIOLENCE':
      return '폭력 민원이 발생했어요.';
    case 'SEXUAL_HARASSMENT':
      return '성추행 민원이 발생했어요.';
    default:
      return '민원이 발생했어요.';
  }
};

const formatComplaintShortContentToKoSentence = (shortComplaintType?: ShortComplaintType) => {
  if (!shortComplaintType) return;

  switch (shortComplaintType) {
    case 'WASTE':
      return '오물이 있어요!';
    case 'VOMIT':
      return '토사물이 있어요!';
    case 'VENTILATION_REQUEST':
      return '안좋은 냄새가 나요, 환기 좀 부탁드려요!';
    case 'NOISY':
      return '안내방송이 너무 커서 시끄러워요!';
    case 'NOT_HEARD':
      return '안내방송이 너무 작아서 안들려요!';
    case 'TOO_HOT':
      return '너무 더워요! 온도 좀 낮춰주세요.';
    case 'TOO_COLD':
      return '너무 추워요! 온도 좀 높여주세요.';
    case 'MOBILE_VENDOR':
      return '이동상인이 물건을 팔아요!';
    case 'DRUNK':
      return '취객이 돌아다녀요!';
    case 'HOMELESS':
      return '지하철에서 노숙을 하고 계세요!';
    case 'BEGGING':
      return '지하철에서 구걸하고 계신 분이 있어요!';
    case 'RELIGIOUS_ACTIVITY':
      return '지하철에서 종교행위하고 계신 분이 있어요!';
    case 'SELF':
      return '본인이 환자입니다.';
    case 'WITNESS':
      return '본인은 목격자입니다.';
    case 'VICTIM':
      return '본인이 피해자입니다.';
    default:
      return '민원이 발생했어요';
  }
};

type Props = {
  id: number;
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  subwayLineId: number;
  createdBy: number;
};

export default function SendComplaintMessage({
  id,
  complaintType,
  shortContentType,
  subwayLineId,
  createdBy,
}: Props) {
  const { user } = useUser();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const isAuthor = user?.memberId === createdBy;
  const lineName = subwayLineOptions[subwayLineId.toString() as keyof typeof subwayLineOptions];
  const targetUrl = getSharePageURL('ComplaintDetailPage');
  const url = `${targetUrl}/${id}`;

  const messageContent = [
    `${lineName} ${formatComplaintTypeToKoSentence(complaintType)}`,
    formatComplaintShortContentToKoSentence(shortContentType),
    '',
    '아하철에서 자세한 내용을 확인해주세요.',
    '',
    url,
  ].join('\n');

  const handleClick = () => {
    if (isBridgeInitialized) {
      const phoneNumber = getSubwayComplaintCallNumber(+subwayLineId);
      bridge.send.sendTextMessage(phoneNumber, messageContent);
    }
  };

  if (!isAuthor) return null;

  return (
    <UiComponent.FloatButton css={{ bottom: '130px' }} onClick={handleClick}>
      즉시 민원 보내기
    </UiComponent.FloatButton>
  );
}
