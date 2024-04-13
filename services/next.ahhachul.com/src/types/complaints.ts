import { IPageParams } from './request';
import { ImageType, ListResponse } from './response';
import { Nullable } from './utility-types';

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
  /** 칸 번호 */
  roomNumber: number;
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
  image: ImageType;
}

export type IComplaintList = ListResponse<IComplaint>;

export type IComplaintDetail = Omit<IComplaint, 'image'> & {
  images: ImageType[];
};

export interface IComplaintParams extends IPageParams {
  /** 민원 타입  */
  complaintType?: string;
  /**  커뮤니티 포스트 호선 */
  subwayLineId?: number;
  /** 검색하고자 하는 내용 */
  content?: string;
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
  /** 첨부 이미지 */
  imageFiles: Nullable<File>;
}
