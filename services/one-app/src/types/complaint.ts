import type { IPost, CursorPagination, IPostImage, SubwayLineFilterOptions } from './common';

export type ComplaintType =
  | 'ENVIRONMENTAL_COMPLAINT'
  | 'TEMPERATURE_CONTROL'
  | 'DISORDER'
  | 'ANNOUNCEMENT'
  | 'EMERGENCY_PATIENT'
  | 'VIOLENCE'
  | 'SEXUAL_HARASSMENT';

export type ShortComplaintType =
  | 'WASTE'
  | 'VOMIT'
  | 'VENTILATION_REQUEST'
  | 'NOISY'
  | 'NOT_HEARD'
  | 'TOO_HOT'
  | 'TOO_COLD'
  | 'MOBILE_VENDOR'
  | 'DRUNK'
  | 'HOMELESS'
  | 'BEGGING'
  | 'RELIGIOUS_ACTIVITY'
  | 'SELF'
  | 'WITNESS'
  | 'VICTIM';

export type ComplaintStatus = 'CREATED' | 'DONE';

export interface ComplaintPost extends IPost {
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  trainNo: string;
  phoneNumber: string;
  location: number;
  status: ComplaintStatus;
}

export interface ComplaintPostDetail extends ComplaintPost {
  images: IPostImage[];
}

export type ComplaintSubwayLineFilterValue = SubwayLineFilterOptions | `${number}`;
export type ComplaintStationFilterValue = `${number}`;

export interface ComplaintListParams<TSubwayLine = number> extends Partial<CursorPagination> {
  subwayLineId: TSubwayLine;
  stationId?: number;
  keyword?: string;
}

export interface ComplaintForm {
  title: string;
  content: string;
  subwayLineId: number;
  stationId: number;
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  images: File[];
}

export type ComplaintFilterKeys = 'subwayLineId' | 'stationId';

export type ComplaintFilterValues = {
  subwayLineId: ComplaintSubwayLineFilterValue;
  stationId: ComplaintStationFilterValue;
};

export type ComplaintFilters = {
  [K in ComplaintFilterKeys]: ComplaintFilterValues[K];
};
