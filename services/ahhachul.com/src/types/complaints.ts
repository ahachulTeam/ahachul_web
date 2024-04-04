export interface IComplaintStore {
  activeView: ComplaintViewType;
}

export type ComplaintViewType = 'SUBMISSION' | 'LIST';

export interface IComplaint {
  /** 열차 번호 */
  trainNo: string;
  /** 민원 세부 내용 */
  content: string;
  /** 민원 타입 */
  complaintType: string;
  /** 민원 요약 정보 */
  shortContent: string;
}

export interface IComplaintForm extends IComplaint {}
