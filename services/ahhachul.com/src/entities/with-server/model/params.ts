export type PageSort = 'favor,desc' | 'favor,asc' | 'answeredAt,desc' | 'answeredAt,asc';
export interface PageParams {
  page: number;
  size: number;
}
export interface WithImageFile {
  imageFiles: File;
}
