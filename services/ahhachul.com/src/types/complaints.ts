import { ImageType } from './response';

export interface IComplaintStore {
  activeView: ComplaintViewType;
}

export type ComplaintViewType = 'SUBMISSION' | 'LIST';

export interface IComplaint {
  /** 민원 ID */
  id: string;
  /** 열차 번호 */
  trainNo: string;
  /** 민원 제목 */
  title: string;
  /** 민원 세부 내용 */
  content: string;
  /** 민원 타입 */
  complaintType: string;
  /** 민원 요약 정보 */
  shortContent: string;
  /** 호선 이름 */
  lineName: string;
  /** 호선 ID */
  subwayLineId: string;
  /** 조회수 */
  viewCnt: number;
  /** 댓글수 */
  commentCnt: number;
  /** 생성일 */
  createdAt: string;
  /** 생성한 유저 ID */
  createdBy: string;
  /** 생성한 유저 닉네임 */
  writer: string;
  /** 민원 상세 이미지 리스트 */
  images: ImageType[];
}

export interface IComplaintForm {
  /** 열차 번호 */
  trainNo: string;
  /** 민원 세부 내용 */
  content: string;
  /** 민원 요약 정보 */
  shortContent: string;
  /** 민원 타입 */
  complaintType: string;
}
