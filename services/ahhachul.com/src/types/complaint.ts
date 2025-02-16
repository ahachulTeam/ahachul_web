import type { Post, CursorPagination, PostImage, SubwayLineFilterOptions } from './common';

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

export interface ComplaintPost extends Post {
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  trainNo: string;
  phoneNumber: string;
  location: number;
  status: ComplaintStatus;
}

export interface ComplaintPostDetail extends ComplaintPost {
  images: PostImage[];
}

export interface ComplaintListParams<TSubwayLine = number> extends Partial<CursorPagination> {
  subwayLineId: TSubwayLine;
  keyword?: string;
}

export interface ComplaintForm {
  title: string;
  content: string;
  subwayLineId: number;
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  images: File[];
}

export type ComplaintFilterKeys = 'subwayLineId';

export type ComplaintFilterValues = {
  subwayLineId: SubwayLineFilterOptions;
};

export type ComplaintFilters = {
  [K in ComplaintFilterKeys]: ComplaintFilterValues[K];
};
