export interface Article {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface WithHashTags {
  hashTags: string[];
}
