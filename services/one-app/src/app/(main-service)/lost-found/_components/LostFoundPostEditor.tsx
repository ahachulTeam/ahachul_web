'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { EditorState } from 'lexical';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Editor } from '@/component/Editor';
import { SUBWAY_LINES, TIMESTAMP } from '@/constant';
import { lostTypeOptions } from '@/constant/lost-found';
import { fetchClient } from '@/lib/fetch-client';
import {
  LostFoundType,
  type ApiResponse,
  type EditableImage,
  type LostFoundEditForm,
  type LostFoundForm,
  type LostFoundPostDetail,
} from '@/types';
import { isLexicalContent } from '@/util';

import { createLostFoundPost, editLostFoundPost } from '../_lib/upsertPost';

const MAX_IMAGE_COUNT = 5;
const MAX_TITLE_LENGTH = 80;

type Props =
  | {
      mode: 'create';
    }
  | {
      mode: 'edit';
      postId: number;
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
  const isEditMode = props.mode === 'edit';
  const editTargetId = isEditMode ? props.postId : -1;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorInitialState, setEditorInitialState] = useState<string | undefined>(undefined);
  const [lostType, setLostType] = useState<LostFoundType>(LostFoundType.LOST);
  const [subwayLineId, setSubwayLineId] = useState<number>(SUBWAY_LINES[0]?.id ?? 1);
  const [images, setImages] = useState<EditableImage[]>([]);
  const [removeFileIds, setRemoveFileIds] = useState<number[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [isHydratedEditDefaults, setIsHydratedEditDefaults] = useState(!isEditMode);
  const objectUrlsRef = useRef(new Set<string>());

  const detailQuery = useQuery({
    queryKey: ['lost-found-post', editTargetId],
    queryFn: () => fetchClient<ApiResponse<LostFoundPostDetail>>(`/lost-posts/${editTargetId}`),
    enabled: isEditMode,
    staleTime: 5 * TIMESTAMP.MINUTE,
    gcTime: 10 * TIMESTAMP.MINUTE,
    select: response => response.result,
  });

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!isEditMode || !detailQuery.data || isHydratedEditDefaults) {
      return;
    }

    const post = detailQuery.data;
    const serializedContent = isLexicalContent(post.content)
      ? post.content
      : createLexicalStateFromText(post.content ?? '');

    setTitle(post.title ?? '');
    setLostType(post.lostType ?? LostFoundType.LOST);
    setSubwayLineId(post.subwayLineId || SUBWAY_LINES[0]?.id || 1);
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

  const validationMessage = useMemo(() => {
    if (!title.trim()) {
      return '제목을 입력해주세요.';
    }

    if (title.trim().length > MAX_TITLE_LENGTH) {
      return `제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해주세요.`;
    }

    if (!content.trim()) {
      return '내용을 입력해주세요.';
    }

    if (!subwayLineId) {
      return '지하철 호선을 선택해주세요.';
    }

    return '';
  }, [content, subwayLineId, title]);

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

  const mutation = useMutation({
    mutationFn: async () => {
      const normalizedTitle = title.trim();
      const normalizedContent = content.trim();

      if (isEditMode) {
        const payload: LostFoundEditForm = {
          title: normalizedTitle,
          content: normalizedContent,
          subwayLineId,
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
        lostType,
        images: images.flatMap(image => (image.data ? [image.data] : [])),
      };

      return createLostFoundPost(payload);
    },
    onSuccess: response => {
      router.replace(`/lost-found/${response.result.id}`);
      router.refresh();
    },
    onError: error => {
      if (error instanceof Error) {
        setSubmitError(error.message);
        return;
      }

      setSubmitError('요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
          <h1 className="text-title-small text-gray-100">유실물 게시글을 불러오지 못했습니다.</h1>
          <p className="mt-2 text-body-medium text-gray-80">
            네트워크 상태를 확인한 뒤 다시 시도해주세요.
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/lost-found/${editTargetId}`}
              className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
            >
              상세 페이지로 이동
            </Link>
            <Link
              href="/lost-found"
              className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
            >
              목록으로 이동
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
          <h1 className="text-title-small text-gray-100">유실물 게시글을 불러오는 중입니다.</h1>
          <p className="mt-2 text-body-medium text-gray-80">잠시만 기다려주세요.</p>
        </section>
      </main>
    );
  }

  const cancelHref = isEditMode ? `/lost-found/${editTargetId}` : '/lost-found';

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">
          {isEditMode ? '유실물 게시글 수정' : '유실물 게시글 등록'}
        </h1>
        <p className="mt-2 text-body-medium text-gray-80">
          등록된 정보는 노선별 유실물 탐색과 상세 페이지에서 즉시 확인할 수 있습니다.
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="lostType" className="text-label-medium text-gray-90">
              유형
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
              지하철 호선
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
            <label htmlFor="title" className="text-label-medium text-gray-90">
              제목
            </label>
            <input
              id="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
              maxLength={MAX_TITLE_LENGTH}
              placeholder="유실물 제목을 입력해주세요"
              className="mt-2 h-11 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-medium text-gray-100 outline-none placeholder:text-gray-70 focus:border-key-color"
            />
            <p className="mt-1 text-right text-body-small text-gray-70">
              {title.trim().length} / {MAX_TITLE_LENGTH}
            </p>
          </div>

          <div>
            <label className="text-label-medium text-gray-90">내용</label>
            <div className="mt-2 h-56 [&>div>div]:h-full [&>div>div]:rounded-xl [&>div>div]:border-gray-40 [&>div>div]:p-3 [&>div>div]:text-body-medium [&>div>div]:text-gray-100">
              <Editor
                placeholder="분실물 상세 상황을 작성해주세요."
                initialState={editorInitialState}
                onChange={handleContentChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="images" className="text-label-medium text-gray-90">
                이미지
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
                      alt={`첨부 이미지 ${index + 1}`}
                      className="h-24 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute right-1 top-1 inline-flex h-6 items-center rounded-md bg-black/70 px-2 text-[11px] text-white"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className={`text-body-small ${submitError ? 'text-red' : 'text-gray-70'}`}>
            {submitError || validationMessage || '등록 전 내용과 첨부 파일을 확인해주세요.'}
          </p>

          <div className="mt-1 flex gap-2">
            <Link
              href={cancelHref}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-gray-40 bg-white text-label-medium text-gray-90"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-key-color text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
            >
              {mutation.isPending ? '저장 중...' : isEditMode ? '수정 완료' : '등록 완료'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
