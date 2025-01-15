export type PageSort =
  | 'likes,desc'
  | 'likes,asc'
  | 'createdAt,desc'
  | 'createdAt,asc'
  | 'views,desc'
  | 'views,asc';
export interface PageParams {
  page: number;
  size: number;
}

export interface CursorBasedPaginationParams {
  pageSize: number;
  pageToken?: number;
}
export interface WithImageFile {
  imageFiles: File;
}
