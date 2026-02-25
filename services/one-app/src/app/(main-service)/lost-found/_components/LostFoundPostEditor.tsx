'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { EditorState } from 'lexical';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  lostFoundQueryKeys,
  subwayQueryKeys,
} from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';
import {
  getNormalizedTextLength,
  isBlankText,
  normalizeInputText,
  validateRequiredLexicalContent,
} from '@ahhachul/utils';

import { Editor } from '@/components/Editor';
import { SUBWAY_LINES } from '@/constants';
import { lostTypeOptions } from '@/constants/lost-found';
import { getLocaleMessages, localizePathname, resolvePathLocale } from '@/i18n';
import { fetchClient } from '@/lib/fetch-client';
import { fetchForeignerStationGuideV2 } from '@/lib/foreigner-mode';
import { resolvePostSubmitErrorMessage } from '@/lib/post-submit-error';
import {
  LostFoundType,
  type ApiResponse,
  type EditableImage,
  type ForeignerLocale,
  type LostFoundEditForm,
  type LostFoundForm,
  type LostFoundPostDetail,
} from '@/types';
import { isLexicalContent } from '@/utils';

import { createLostFoundPost, editLostFoundPost } from '../_lib/upsertPost';

const MAX_IMAGE_COUNT = 5;
const MAX_TITLE_LENGTH = 80;
const DEFAULT_STATION_ID = 0;
const FOREIGNER_LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ไทย' },
  { value: 'cn', label: '中文' },
  { value: 'ko', label: '한국어' },
];

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

function createLexicalStateFromText(text: string): string {
  return JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  });
}

export default function LostFoundPostEditor(props: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? '/lost-found';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).lostFoundEditor;
  const isEditMode = props.mode === 'edit';
  const editTargetId = isEditMode ? props.postId : -1;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorInitialState, setEditorInitialState] = useState<string | undefined>(undefined);
  const [lostType, setLostType] = useState<LostFoundType>(LostFoundType.LOST);
  const [subwayLineId, setSubwayLineId] = useState<number>(SUBWAY_LINES[0]?.id ?? 1);
  const [stationId, setStationId] = useState<number>(DEFAULT_STATION_ID);
  const [images, setImages] = useState<EditableImage[]>([]);
  const [removeFileIds, setRemoveFileIds] = useState<number[]>([]);
  const [templateLocale, setTemplateLocale] = useState<ForeignerLocale>('en');
  const [isTemplateApplying, setIsTemplateApplying] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isHydratedEditDefaults, setIsHydratedEditDefaults] = useState(!isEditMode);
  const objectUrlsRef = useRef(new Set<string>());

  const detailQuery = useQuery({
    queryKey: lostFoundQueryKeys.detail(editTargetId),
    queryFn: () =>
      fetchClient<ApiResponse<LostFoundPostDetail>>(API_PATHS.lostFound.detail(editTargetId)),
    enabled: isEditMode,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: response => response.result,
  });
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

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const shouldSkipHydration = !isEditMode || !detailQuery.data || isHydratedEditDefaults;
    if (shouldSkipHydration) {
      return;
    }

    const post = detailQuery.data;
    const serializedContent = isLexicalContent(post.content)
      ? post.content
      : createLexicalStateFromText(post.content ?? '');

    setTitle(post.title ?? '');
    setLostType(post.lostType ?? LostFoundType.LOST);
    setSubwayLineId(post.subwayLineId || SUBWAY_LINES[0]?.id || 1);
    setStationId(post.stationId ?? DEFAULT_STATION_ID);
    setImages(
      (post.images ?? []).map(image => ({
        id: image.imageId ?? null,
        data: null,
        url: image.imageUrl,
      })),
    );
    setRemoveFileIds([]);
    setEditorInitialState(serializedContent);
    setContent(serializedContent);
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
      return copy.validation.titleRequired;
    }

    if (getNormalizedTextLength(title) > MAX_TITLE_LENGTH) {
      return copy.validation.titleMax.replace('{max}', String(MAX_TITLE_LENGTH));
    }

    const contentValidation = validateRequiredLexicalContent(content, {
      requiredMessage: copy.validation.contentRequired,
    });
    if (!contentValidation.isValid) {
      return contentValidation.message;
    }

    if (!subwayLineId) {
      return copy.validation.subwayLineRequired;
    }

    if (stationId <= 0) {
      return copy.validation.stationRequired;
    }

    return '';
  }, [
    content,
    copy.validation.contentRequired,
    copy.validation.stationRequired,
    copy.validation.subwayLineRequired,
    copy.validation.titleMax,
    copy.validation.titleRequired,
    stationId,
    subwayLineId,
    title,
  ]);

  const handleContentChange = (editorState: EditorState | null) => {
    if (!editorState) {
      setContent('');
      return;
    }

    setContent(JSON.stringify(editorState.toJSON()));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    setImages(currentImages => {
      const availableSlots = Math.max(0, MAX_IMAGE_COUNT - currentImages.length);
      const filesForUpload = selectedFiles.slice(0, availableSlots);

      const nextImages = filesForUpload.map(file => {
        const previewUrl = URL.createObjectURL(file);
        objectUrlsRef.current.add(previewUrl);

        return {
          id: null,
          data: file,
          url: previewUrl,
        } satisfies EditableImage;
      });

      return [...currentImages, ...nextImages];
    });

    event.target.value = '';
  };

  const handleImageDelete = (targetIndex: number) => {
    setImages(currentImages => {
      const targetImage = currentImages[targetIndex];

      if (!targetImage) {
        return currentImages;
      }

      if (targetImage.id !== null) {
        setRemoveFileIds(ids => (ids.includes(targetImage.id!) ? ids : [...ids, targetImage.id!]));
      }

      if (targetImage.url.startsWith('blob:')) {
        URL.revokeObjectURL(targetImage.url);
        objectUrlsRef.current.delete(targetImage.url);
      }

      return currentImages.filter((_, index) => index !== targetIndex);
    });
  };

  const handleApplyForeignerTemplate = async () => {
    if (stationId <= 0 || subwayLineId <= 0) {
      setSubmitError('노선과 역을 먼저 선택한 뒤 템플릿을 적용해주세요.');
      return;
    }

    setIsTemplateApplying(true);
    setSubmitError('');

    try {
      const guide = await fetchForeignerStationGuideV2({
        stationId,
        subwayLineId,
        locale: templateLocale,
      });
      const lexicalState = createLexicalStateFromText(guide.templates.lostBodyTemplate);
      setTitle(guide.templates.lostTitleTemplate);
      setEditorInitialState(lexicalState);
      setContent(lexicalState);
    } catch {
      setSubmitError('다국어 템플릿을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsTemplateApplying(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const normalizedTitle = normalizeInputText(title);
      const normalizedContent = normalizeInputText(content);

      if (isEditMode) {
        const payload: LostFoundEditForm = {
          title: normalizedTitle,
          content: normalizedContent,
          subwayLineId,
          stationId,
          lostType,
          images,
          removeFileIds: Array.from(new Set(removeFileIds)),
        };

        return editLostFoundPost(editTargetId, payload);
      }

      const payload: LostFoundForm = {
        title: normalizedTitle,
        content: normalizedContent,
        subwayLineId,
        stationId,
        lostType,
        images: images.flatMap(image => (image.data ? [image.data] : [])),
      };

      return createLostFoundPost(payload);
    },
    onSuccess: response => {
      router.replace(localizePathname(`/lost-found/${response.result.id}`, locale));
      router.refresh();
    },
    onError: error => {
      setSubmitError(
        resolvePostSubmitErrorMessage(error, {
          fallbackMessage: copy.submitError,
          fileUploadMessage: copy.submitFileUploadError,
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

  if (isEditMode && detailQuery.isError) {
    return (
      <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
        <section className="rounded-2xl border border-red/30 bg-white p-4">
          <h1 className="text-title-small text-gray-100">{copy.loadErrorTitle}</h1>
          <p className="mt-2 text-body-medium text-gray-80">{copy.loadErrorDescription}</p>
          <div className="mt-4 flex gap-2">
            <Link
              href={localizePathname(`/lost-found/${editTargetId}`, locale)}
              className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
            >
              {copy.goToDetail}
            </Link>
            <Link
              href={localizePathname('/lost-found', locale)}
              className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
            >
              {copy.goToList}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (isEditMode && !isHydratedEditDefaults) {
    return (
      <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
        <section className="rounded-2xl border border-gray-30 bg-white p-4">
          <h1 className="text-title-small text-gray-100">{copy.loadingTitle}</h1>
          <p className="mt-2 text-body-medium text-gray-80">{copy.loadingDescription}</p>
        </section>
      </main>
    );
  }

  const cancelHref = isEditMode
    ? localizePathname(`/lost-found/${editTargetId}`, locale)
    : localizePathname('/lost-found', locale);
  let submitButtonLabel = copy.submitCreate;
  if (mutation.isPending) {
    submitButtonLabel = copy.submitPending;
  } else if (isEditMode) {
    submitButtonLabel = copy.submitEdit;
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">
          {isEditMode ? copy.headingEdit : copy.headingCreate}
        </h1>
        <p className="mt-2 text-body-medium text-gray-80">{copy.description}</p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="rounded-xl border border-gray-20 bg-gray-05 p-3">
            <p className="text-label-medium text-gray-100">다국어 템플릿</p>
            <p className="mt-1 text-body-small text-gray-70">
              선택한 언어 템플릿을 제목/본문에 자동 입력합니다.
            </p>
            <div className="mt-2 flex gap-2">
              <select
                value={templateLocale}
                onChange={event => setTemplateLocale(event.target.value as ForeignerLocale)}
                className="h-10 flex-1 rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-90"
              >
                {FOREIGNER_LOCALE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  void handleApplyForeignerTemplate();
                }}
                disabled={isTemplateApplying}
                className="h-10 rounded-lg border border-gray-40 px-3 text-label-small text-gray-90 disabled:cursor-not-allowed disabled:text-gray-50"
              >
                {isTemplateApplying ? '적용 중...' : '템플릿 적용'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="lostType" className="text-label-medium text-gray-90">
              {copy.typeLabel}
            </label>
            <select
              id="lostType"
              value={lostType}
              onChange={event => setLostType(event.target.value as LostFoundType)}
              className="mt-2 h-11 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-medium text-gray-100 outline-none focus:border-key-color"
            >
              {Object.entries(lostTypeOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subwayLineId" className="text-label-medium text-gray-90">
              {copy.subwayLineLabel}
            </label>
            <select
              id="subwayLineId"
              value={subwayLineId}
              onChange={event => setSubwayLineId(Number(event.target.value))}
              className="mt-2 h-11 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-medium text-gray-100 outline-none focus:border-key-color"
            >
              {SUBWAY_LINES.map(line => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stationId" className="text-label-medium text-gray-90">
              {copy.stationLabel}
            </label>
            <select
              id="stationId"
              value={stationId}
              onChange={event => setStationId(Number(event.target.value))}
              className="mt-2 h-11 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-medium text-gray-100 outline-none focus:border-key-color"
            >
              <option value={DEFAULT_STATION_ID}>{copy.stationPlaceholder}</option>
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}역
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="text-label-medium text-gray-90">
              {copy.titleLabel}
            </label>
            <input
              id="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
              maxLength={MAX_TITLE_LENGTH}
              placeholder={copy.titlePlaceholder}
              className="mt-2 h-11 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-medium text-gray-100 outline-none placeholder:text-gray-70 focus:border-key-color"
            />
            <p className="mt-1 text-right text-body-small text-gray-70">
              {getNormalizedTextLength(title)} / {MAX_TITLE_LENGTH}
            </p>
          </div>

          <div>
            <label className="text-label-medium text-gray-90">{copy.contentLabel}</label>
            <div className="mt-2 h-56 [&>div>div]:h-full [&>div>div]:rounded-xl [&>div>div]:border-gray-40 [&>div>div]:p-3 [&>div>div]:text-body-medium [&>div>div]:text-gray-100">
              <Editor
                placeholder={copy.contentPlaceholder}
                initialState={editorInitialState}
                onChange={handleContentChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="images" className="text-label-medium text-gray-90">
                {copy.imageLabel}
              </label>
              <span className="text-body-small text-gray-70">
                {images.length} / {MAX_IMAGE_COUNT}
              </span>
            </div>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={images.length >= MAX_IMAGE_COUNT}
              className="mt-2 block w-full text-body-small text-gray-80 file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-gray-20 file:px-3 file:text-body-small file:text-gray-90 disabled:cursor-not-allowed"
            />
            {images.length > 0 && (
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <li key={`${image.id ?? 'new'}-${image.url}`} className="relative">
                    <img
                      src={image.url}
                      alt={copy.imageAlt.replace('{index}', String(index + 1))}
                      className="h-24 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute right-1 top-1 inline-flex h-6 items-center rounded-md bg-black/70 px-2 text-[11px] text-white"
                    >
                      {copy.imageDelete}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className={`text-body-small ${submitError ? 'text-red' : 'text-gray-70'}`}>
            {submitError || validationMessage || copy.submitHint}
          </p>

          <div className="mt-1 flex gap-2">
            <Link
              href={cancelHref}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-gray-40 bg-white text-label-medium text-gray-90"
            >
              {copy.cancel}
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-key-color text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
            >
              {submitButtonLabel}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
