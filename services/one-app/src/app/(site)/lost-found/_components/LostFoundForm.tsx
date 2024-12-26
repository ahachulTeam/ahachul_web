'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import CloseCircleIcon from '@/common/assets/icons/close-circle';
import ImagePlaceHolder from '@/common/assets/icons/image-placeholder';
import SelectLineDrawer from './SelectLineDrawer';
import Editor from '@/app/(site)/_component/Editor';

import useFormImage from '../_hook/useFormImage';
import useFormInitialize from '../_hook/useFormInitialize';
import createFormData from '@/lib/createFormData';
import { usePostLostFound } from '../_lib/post';

import { type EditorState } from 'lexical';
import type { LostFoundFormData } from '@/model/LostFound';

type Props = {
  lostId?: string | null;
  initialFormData?: LostFoundFormData | null;
};

const LostFoundForm = ({ lostId = null, initialFormData = null }: Props) => {
  const router = useRouter();

  const { mutate: lostFoundMutate } = usePostLostFound((id: string) => {
    router.push(`/lost-found/${id}`);
  });

  const { images, setImages, removeImageIds, handleFileChange, onDeleteImage } =
    useFormImage();

  const [subwayLineId, setSubwayLineId] = useState(1);
  const [title, setTitle] = useState('');
  const [lostType, setLostType] = useState('LOST');
  const [editorContent, setEditorContent] = useState<string | null>(null);

  const isActiveSubmitButton = !!title && !!subwayLineId && !!editorContent;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contentData = {
      title,
      content: editorContent,
      subwayLineId,
      lostType,
      ...(lostId && removeImageIds.length && { removeImageIds }),
    };

    const postData = createFormData({
      jsonDataKey: 'content',
      jsonData: contentData,
      fileDataKey: 'files',
      fileData: images.flatMap((image) =>
        image.data !== null ? [image.data] : [],
      ),
    });
    lostFoundMutate({ lostId, postData });
  };

  const onChangeEditorContent = (editorState: EditorState | null) => {
    if (editorState) {
      setEditorContent(JSON.stringify(editorState.toJSON()));
    } else {
      setEditorContent(null);
    }
  };

  useFormInitialize({
    initialFormData,
    initCallback: ({ title, initialContent, subwayLineId, images }) => {
      setTitle(title);
      setEditorContent(initialContent);
      setSubwayLineId(subwayLineId);
      setImages(images);
    },
  });

  return (
    <form onSubmit={onSubmit} className="overflow-hidden">
      <div className="flex justify-between px-[20px] py-[12px]">
        <ArrowLeftIcon />
        <button
          type="submit"
          disabled={!isActiveSubmitButton}
          className={`px-[13px] py-[6px] rounded-[3px] text-body-small ${isActiveSubmitButton ? 'bg-key-color text-gray-0 cursor-pointer' : 'bg-gray-30 text-gray-70 cursor-not-allowed'}`}
        >
          등록
        </button>
      </div>
      <div className="h-full box-border pb-[26px] px-5 max-w-[520px]">
        <div className="mb-8">
          <p className="text-label-medium mb-3">유실물 상세정보</p>
          <div
            className={`flex pt-1.5 overflow-x-auto overflow-scroll [&::-webkit-scrollbar]:hidden`}
          >
            <label
              htmlFor="image-upload"
              className="flex justify-center items-center size-16 min-w-16 border rounded-[10px] border-[#CED0DD] cursor-pointer"
            >
              <ImagePlaceHolder />
              <input
                id="image-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
            {images.map((image, index) => {
              return (
                <div
                  key={`${image.data}-${index}`}
                  className="relative min-w-16"
                >
                  <img
                    className="border size-16 rounded-[10px] border-[#CED0DD] ml-2"
                    src={image.url}
                  />
                  <button
                    type="button"
                    className="absolute -top-1.5 -right-1.5 z-10"
                    onClick={() => onDeleteImage(index)}
                  >
                    <CloseCircleIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-3">
            <p className="mr-1 gray-90 text-label-medium">카테고리</p>
            <span className="inline-block w-[5px] h-[5px] bg-red rounded-full" />
          </div>
          <fieldset>
            <input
              type="radio"
              name="category"
              id="lost"
              value="LOST"
              defaultChecked
              onChange={(e) => setLostType(e.target.value)}
              className="peer/lost hidden"
            />
            <label
              htmlFor="lost"
              className="box-border px-[12px] py-[7px] rounded border text-label-medium text-gray-90 mr-2.5 peer-checked/lost:border-key-color peer-checked/lost:bg-key-color peer-checked/lost:text-gray-0"
            >
              분실물
            </label>

            <input
              type="radio"
              name="category"
              value="ACQUIRE"
              id="acquire"
              onChange={(e) => setLostType(e.target.value)}
              className="peer/acquire hidden"
            />
            <label
              htmlFor="acquire"
              className="box-border px-[12px] py-[7px] rounded border text-label-medium text-gray-90  peer-checked/acquire:border-key-color peer-checked/acquire:bg-key-color peer-checked/acquire:text-gray-0"
            >
              습득물
            </label>
          </fieldset>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <p className="mr-1 text-label-medium text-gray-90">호선 선택</p>
            <span className="inline-block w-[5px] h-[5px] bg-red rounded-full" />
          </div>
          <SelectLineDrawer
            subwayLineId={subwayLineId}
            setSubwayLineId={setSubwayLineId}
          />
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <p className="mr-1 text-label-medium text-gray-90">제목</p>
            <span className="inline-block w-[5px] h-[5px] bg-red rounded-full" />
          </div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border py-3 pl-3 pr-4 outline-none rounded-[5px] text-body-large-semi text-gray-90 placeholder:text-gray-70"
          />
        </div>
        <div className="relative w-full h-[200px] mb-[32px]">
          <div className="flex items-center mb-3">
            <p className="mr-1 text-label-medium text-gray-90">자세한 설명</p>
            <span className="inline-block w-[5px] h-[5px] bg-red rounded-full" />
          </div>
          <Editor
            placeholder={
              '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
            }
            initialState={initialFormData?.initialContent}
            onChange={onChangeEditorContent}
          />
        </div>
      </div>
    </form>
  );
};

export default LostFoundForm;
