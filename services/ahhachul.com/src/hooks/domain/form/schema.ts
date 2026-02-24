import { z } from 'zod';

import {
  CommunityType,
  LostFoundType,
  type CommunityEditForm,
  type CommunityForm,
  type EditableImage,
  type LostFoundEditForm,
  type LostFoundForm,
} from '@/types';
import type { ComplaintForm, ComplaintType, ShortComplaintType } from '@/types/complaint';

export const MAX_POST_IMAGE_COUNT = 5;
const MAX_POST_TITLE_LENGTH = 80;

const fileSchema: z.ZodType<File> = z.custom<File>(
  (value: unknown) => {
    if (typeof File === 'undefined') {
      return true;
    }
    return value instanceof File;
  },
  { message: '유효한 파일 형식이 아닙니다.' },
);

const editableImageSchema: z.ZodType<EditableImage> = z.object({
  id: z.number().int().nullable(),
  data: z.union([fileSchema, z.null()]),
  url: z.string().min(1),
});

const titleSchema = z
  .string()
  .trim()
  .min(1, '제목을 입력해주세요.')
  .max(MAX_POST_TITLE_LENGTH, `제목은 ${MAX_POST_TITLE_LENGTH}자 이하로 입력해주세요.`);
const contentSchema = z.string().min(1, '내용을 입력해주세요.');
const subwayLineIdSchema = z.coerce.number().int().positive('지하철 호선을 선택해주세요.');
const stationIdSchema = z.coerce.number().int().positive('지하철 역을 선택해주세요.');
const createImagesSchema = z
  .array(fileSchema)
  .max(MAX_POST_IMAGE_COUNT, `이미지는 최대 ${MAX_POST_IMAGE_COUNT}개까지 첨부할 수 있습니다.`);
const editImagesSchema = z
  .array(editableImageSchema)
  .max(MAX_POST_IMAGE_COUNT, `이미지는 최대 ${MAX_POST_IMAGE_COUNT}개까지 첨부할 수 있습니다.`);

const complaintTypeSchema: z.ZodType<ComplaintType> = z.custom<ComplaintType>(
  (value: unknown) => typeof value === 'string' && value.length > 0,
  { message: '민원 유형을 선택해주세요.' },
);

const shortComplaintTypeSchema: z.ZodType<ShortComplaintType> = z.custom<ShortComplaintType>(
  (value: unknown) => typeof value === 'string' && value.length > 0,
  { message: '민원 세부 유형을 선택해주세요.' },
);

export const communityFormSchema: z.ZodType<CommunityForm> = z.object({
  title: titleSchema,
  content: contentSchema,
  subwayLineId: subwayLineIdSchema,
  stationId: stationIdSchema,
  categoryType: z.nativeEnum(CommunityType),
  images: createImagesSchema,
});

export const communityEditFormSchema: z.ZodType<CommunityEditForm> = z.object({
  title: titleSchema,
  content: contentSchema,
  subwayLineId: subwayLineIdSchema,
  stationId: stationIdSchema,
  categoryType: z.nativeEnum(CommunityType),
  images: editImagesSchema,
  removeFileIds: z.array(z.number().int().positive()),
});

export const lostFoundFormSchema: z.ZodType<LostFoundForm> = z.object({
  title: titleSchema,
  content: contentSchema,
  subwayLineId: subwayLineIdSchema,
  lostType: z.nativeEnum(LostFoundType),
  images: createImagesSchema,
});

export const lostFoundEditFormSchema: z.ZodType<LostFoundEditForm> = z.object({
  title: titleSchema,
  content: contentSchema,
  subwayLineId: subwayLineIdSchema,
  lostType: z.nativeEnum(LostFoundType),
  images: editImagesSchema,
  removeFileIds: z.array(z.number().int().positive()),
});

export const complaintFormSchema: z.ZodType<ComplaintForm> = z.object({
  title: titleSchema,
  content: contentSchema,
  subwayLineId: subwayLineIdSchema,
  complaintType: complaintTypeSchema,
  shortContentType: shortComplaintTypeSchema,
  images: createImagesSchema,
});
