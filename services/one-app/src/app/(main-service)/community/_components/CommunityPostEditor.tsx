'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, communityQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';
import { isBlankText, normalizeInputText } from '@ahhachul/utils';

import { SUBWAY_LINES } from '@/constants';
import { communityTypeOptions } from '@/constants/community';
import { localizePathname, resolvePathLocale } from '@/i18n';
import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse } from '@/types';
import { CommunityType, type CommunityDetail } from '@/types/community';

import { createCommunityPost, editCommunityPost } from '../_lib/upsertPost';

type Props =
  | {
      mode: 'create';
    }
  | {
      mode: 'edit';
      postId: number;
    };

type Station = {
  id: number;
  name: string;
};

type SubwayLine = {
  id: number;
  name: string;
  stations: Station[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLine[];
};

const MAX_TITLE_LENGTH = 80;
const DEFAULT_STATION_ID = 0;

export default function CommunityPostEditor(props: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? '/community';
  const locale = resolvePathLocale(pathname, null);
  const isEditMode = props.mode === 'edit';
  const editTargetId = isEditMode ? props.postId : -1;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subwayLineId, setSubwayLineId] = useState<number>(SUBWAY_LINES[0]?.id ?? 1);
  const [stationId, setStationId] = useState<number>(DEFAULT_STATION_ID);
  const [categoryType, setCategoryType] = useState<CommunityType>(CommunityType.FREE);
  const [submitError, setSubmitError] = useState('');
  const [isHydratedEditDefaults, setIsHydratedEditDefaults] = useState(!isEditMode);

  const detailQuery = useQuery({
    queryKey: communityQueryKeys.detail(editTargetId),
    queryFn: () =>
      fetchClient<ApiResponse<CommunityDetail>>(API_PATHS.community.detail(editTargetId)),
    enabled: isEditMode,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: response => response.result,
  });

  const subwayLineCatalogQuery = useQuery({
    queryKey: ['subway-lines-for-community-editor'],
    queryFn: () => fetchClient<ApiResponse<SubwayLineCatalogResponse>>(API_PATHS.subway.lines),
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
    select: response => response.result.subwayLines,
  });
  const subwayLines = subwayLineCatalogQuery.data ?? [];
  const stationOptions = useMemo(
    () => subwayLines.find(line => line.id === subwayLineId)?.stations ?? [],
    [subwayLineId, subwayLines],
  );

  useEffect(() => {
    if (!isEditMode || !detailQuery.data || isHydratedEditDefaults) {
      return;
    }

    const post = detailQuery.data;
    setTitle(post.title ?? '');
    setContent(post.content ?? '');
    setSubwayLineId(post.subwayLineId || SUBWAY_LINES[0]?.id || 1);
    setStationId(post.stationId ?? DEFAULT_STATION_ID);
    setCategoryType(post.categoryType ?? CommunityType.FREE);
    setIsHydratedEditDefaults(true);
  }, [detailQuery.data, isEditMode, isHydratedEditDefaults]);

  useEffect(() => {
    if (stationId === DEFAULT_STATION_ID) {
      return;
    }

    if (stationOptions.some(station => station.id === stationId)) {
      return;
    }

    setStationId(DEFAULT_STATION_ID);
  }, [stationId, stationOptions]);

  const validationMessage = useMemo(() => {
    if (isBlankText(title)) {
      return '제목을 입력해주세요.';
    }

    if (normalizeInputText(title).length > MAX_TITLE_LENGTH) {
      return `제목은 최대 ${MAX_TITLE_LENGTH}자까지 입력할 수 있습니다.`;
    }

    if (isBlankText(content)) {
      return '내용을 입력해주세요.';
    }

    if (subwayLineId <= 0) {
      return '노선을 선택해주세요.';
    }

    return '';
  }, [content, subwayLineId, title]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: normalizeInputText(title),
        content: normalizeInputText(content),
        categoryType,
        subwayLineId,
        ...(stationId > 0 ? { stationId } : {}),
      };

      if (isEditMode) {
        return editCommunityPost(editTargetId, payload);
      }

      return createCommunityPost(payload);
    },
    onSuccess: response => {
      router.replace(localizePathname(`/community/${response.result.id}`, locale));
      router.refresh();
    },
    onError: error => {
      setSubmitError(error instanceof Error ? error.message : '게시글 저장에 실패했습니다.');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationMessage) {
      setSubmitError(validationMessage);
      return;
    }

    setSubmitError('');
    mutation.mutate();
  };
  let submitLabel = '작성 완료';
  if (isEditMode) {
    submitLabel = '수정 완료';
  }
  if (mutation.isPending) {
    submitLabel = '저장 중...';
  }

  if (isEditMode && detailQuery.isError) {
    return (
      <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
        <section className="rounded-2xl border border-red/30 bg-white p-4">
          <h1 className="text-title-small text-gray-100">커뮤니티 글을 불러오지 못했습니다.</h1>
          <div className="mt-4 flex gap-2">
            <Link
              href={localizePathname(`/community/${editTargetId}`, locale)}
              className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
            >
              게시글로 이동
            </Link>
            <Link
              href={localizePathname('/community', locale)}
              className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
            >
              목록으로 이동
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">
          {isEditMode ? '커뮤니티 게시글 수정' : '커뮤니티 게시글 작성'}
        </h1>
        <p className="mt-1 text-body-medium text-gray-70">
          노선/역 정보를 함께 작성하면 이용자 검색 품질이 좋아집니다.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-3 space-y-3 rounded-2xl border border-gray-30 bg-white p-4"
      >
        <div>
          <label className="text-label-medium text-gray-90" htmlFor="community-title">
            제목
          </label>
          <input
            id="community-title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="제목을 입력해주세요"
            className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
          />
        </div>

        <div>
          <label className="text-label-medium text-gray-90" htmlFor="community-category">
            카테고리
          </label>
          <select
            id="community-category"
            value={categoryType}
            onChange={event => setCategoryType(event.target.value as CommunityType)}
            className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
          >
            {Object.entries(communityTypeOptions)
              .filter(([value]) => value !== 'HOT')
              .map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <label className="text-label-medium text-gray-90" htmlFor="community-line">
              노선
            </label>
            <select
              id="community-line"
              value={subwayLineId}
              onChange={event => setSubwayLineId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
            >
              {SUBWAY_LINES.map(line => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-label-medium text-gray-90" htmlFor="community-station">
              역
            </label>
            <select
              id="community-station"
              value={stationId}
              onChange={event => setStationId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
            >
              <option value={0}>역 선택 안함</option>
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-label-medium text-gray-90" htmlFor="community-content">
            내용
          </label>
          <textarea
            id="community-content"
            value={content}
            onChange={event => setContent(event.target.value)}
            placeholder="내용을 입력해주세요"
            rows={8}
            className="mt-1 w-full rounded-xl border border-gray-30 px-3 py-2 text-body-medium text-gray-90"
          />
        </div>

        {submitError ? <p className="text-body-small text-red">{submitError}</p> : null}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
          >
            {submitLabel}
          </button>
          <Link
            href={localizePathname('/community', locale)}
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
          >
            취소
          </Link>
        </div>
      </form>
    </main>
  );
}
