'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';
import { isBlankText, normalizeInputText } from '@ahhachul/utils';

import { SUBWAY_LINES } from '@/constants';
import { complaintShortTypeOptions, complaintTypeOptions } from '@/constants/complaint';
import { localizePathname, resolvePathLocale } from '@/i18n';
import { fetchClient } from '@/lib/fetch-client';
import { resolvePostSubmitErrorMessage } from '@/lib/post-submit-error';
import type { ApiResponse } from '@/types';
import type { ComplaintForm, ComplaintType, ShortComplaintType } from '@/types/complaint';

import { createComplaintPost } from '../_lib/upsertPost';

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

const DEFAULT_STATION_ID = 0;
const MAX_TITLE_LENGTH = 80;
const DEFAULT_COMPLAINT_TYPE: ComplaintType = 'ENVIRONMENTAL_COMPLAINT';

function resolveDefaultShortType(complaintType: ComplaintType): ShortComplaintType {
  const optionKeys = Object.keys(complaintShortTypeOptions[complaintType]) as ShortComplaintType[];
  return optionKeys[0] ?? 'WASTE';
}

export default function ComplaintPostEditor() {
  const router = useRouter();
  const pathname = usePathname() ?? '/complaint/new';
  const locale = resolvePathLocale(pathname, null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [complaintType, setComplaintType] = useState<ComplaintType>(DEFAULT_COMPLAINT_TYPE);
  const [shortContentType, setShortContentType] = useState<ShortComplaintType>(
    resolveDefaultShortType(DEFAULT_COMPLAINT_TYPE),
  );
  const [subwayLineId, setSubwayLineId] = useState<number>(SUBWAY_LINES[0]?.id ?? 1);
  const [stationId, setStationId] = useState<number>(DEFAULT_STATION_ID);
  const [submitError, setSubmitError] = useState('');

  const subwayLineCatalogQuery = useQuery({
    queryKey: subwayQueryKeys.subwayLine(),
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

  const shortTypeOptions = useMemo(() => complaintShortTypeOptions[complaintType], [complaintType]);

  useEffect(() => {
    if (stationId === DEFAULT_STATION_ID) {
      return;
    }

    if (stationOptions.some(station => station.id === stationId)) {
      return;
    }

    setStationId(DEFAULT_STATION_ID);
  }, [stationId, stationOptions]);

  useEffect(() => {
    if (shortTypeOptions[shortContentType]) {
      return;
    }

    setShortContentType(resolveDefaultShortType(complaintType));
  }, [complaintType, shortContentType, shortTypeOptions]);

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

    if (stationId <= 0) {
      return '역을 선택해주세요.';
    }

    return '';
  }, [content, stationId, subwayLineId, title]);

  const mutation = useMutation({
    mutationFn: () => {
      const payload: ComplaintForm = {
        title: normalizeInputText(title),
        content: normalizeInputText(content),
        subwayLineId,
        stationId,
        complaintType,
        shortContentType,
        images: [],
      };

      return createComplaintPost(payload);
    },
    onSuccess: response => {
      router.replace(localizePathname(`/complaint/${response.result.id}`, locale));
      router.refresh();
    },
    onError: error => {
      setSubmitError(
        resolvePostSubmitErrorMessage(error, {
          fallbackMessage: '민원 등록에 실패했습니다.',
        }),
      );
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

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">민원 등록</h1>
        <p className="mt-1 text-body-medium text-gray-70">
          유형, 노선, 역 정보를 함께 입력하면 처리 품질이 높아집니다.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-3 space-y-3 rounded-2xl border border-gray-30 bg-white p-4"
      >
        <div>
          <label className="text-label-medium text-gray-90" htmlFor="complaint-type">
            민원 유형
          </label>
          <select
            id="complaint-type"
            value={complaintType}
            onChange={event => setComplaintType(event.target.value as ComplaintType)}
            className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
          >
            {Object.entries(complaintTypeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-label-medium text-gray-90" htmlFor="complaint-short-type">
            상세 유형
          </label>
          <select
            id="complaint-short-type"
            value={shortContentType}
            onChange={event => setShortContentType(event.target.value as ShortComplaintType)}
            className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
          >
            {Object.entries(shortTypeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <label className="text-label-medium text-gray-90" htmlFor="complaint-line">
              노선
            </label>
            <select
              id="complaint-line"
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
            <label className="text-label-medium text-gray-90" htmlFor="complaint-station">
              역
            </label>
            <select
              id="complaint-station"
              value={stationId}
              onChange={event => setStationId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
            >
              <option value={0}>역 선택</option>
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-label-medium text-gray-90" htmlFor="complaint-title">
            제목
          </label>
          <input
            id="complaint-title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="제목을 입력해주세요"
            className="mt-1 h-10 w-full rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
          />
        </div>

        <div>
          <label className="text-label-medium text-gray-90" htmlFor="complaint-content">
            내용
          </label>
          <textarea
            id="complaint-content"
            value={content}
            onChange={event => setContent(event.target.value)}
            rows={8}
            placeholder="민원 내용을 입력해주세요"
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
            {mutation.isPending ? '등록 중...' : '등록 완료'}
          </button>
          <Link
            href={localizePathname('/complaint', locale)}
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
          >
            취소
          </Link>
        </div>
      </form>
    </main>
  );
}
