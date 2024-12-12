'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import CloseCircleIcon from '@/common/assets/icons/close-circle';
import ImagePlaceHolder from '@/common/assets/icons/image-placeholder';
import SelectLineDrawer from './SelectLineDrawer';
import Editor from '@/app/(site)/_component/Editor';
import { type EditorState } from 'lexical';
import { apiClient } from '@/app/api';
import { useGetLostFoundDetail } from '../_lib/get';

type Props = {
  lostId?: string | null;
};

const MAX_IMAGE_LENGTH = 5;

const LostFoundForm = ({ lostId = null }: Props) => {
  const { data: lostFoundDetailInfo } = useGetLostFoundDetail(lostId ?? '');

  const router = useRouter();
  const [images, setImages] = useState<{ data: File; url: string }[]>([]);
  const [subwayLineId, setSubwayLineId] = useState(1);
  const [title, setTitle] = useState('');
  const [lostType, setLostType] = useState('LOST');
  const [editorContent, setEditorContent] = useState<string | null>(null);

  const isActiveSubmitButton = !!title && !!subwayLineId && !!editorContent;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_IMAGE_LENGTH) return;
    const fileBlob = e.target.files?.[0];
    if (!fileBlob) return;
    const fileUrl = URL.createObjectURL(fileBlob);
    setImages((prev) => [...prev, { data: fileBlob, url: fileUrl }]);
    e.target.value = '';
  };

  const onDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contentFormData = {
      title,
      content: editorContent,
      subwayLineId,
      lostType,
    };

    const formData = new FormData();
    const contentBlob = new Blob([JSON.stringify(contentFormData)], {
      type: 'application/json',
    });
    formData.append('content', contentBlob);

    images.forEach(({ data }) => {
      if (data instanceof File) {
        formData.append('files', data, data.name);
      }
    });

    try {
      const res = await apiClient.post('/lost-posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { code, result } = res?.data;

      if (code === '100') {
        router.push(`/lost-found/${result.id}`);
      }
    } catch (error) {
      // Todo - 에러 팝업 추가 필요
      alert('유실물 등록 에러 발생');
    }
  };

  const onChangeEditorContent = (editorState: EditorState | null) => {
    if (editorState) {
      setEditorContent(JSON.stringify(editorState.toJSON()));
    } else {
      setEditorContent(null);
    }
  };

  useEffect(() => {
    if (lostFoundDetailInfo) {
      const { title, content, subwayLineId, images } = lostFoundDetailInfo;
      setTitle(title);
      setEditorContent(content);
      setSubwayLineId(subwayLineId);
    }
  }, [lostFoundDetailInfo]);

  return (
    <form onSubmit={onSubmit} className="overflow-hidden">
      <div className="flex justify-between px-[20px] py-[12px]">
        <ArrowLeftIcon />
        <button
          type="submit"
          disabled={!isActiveSubmitButton}
          className={`px-[13px] py-[6px] ${isActiveSubmitButton ? 'bg-[#2ACF6C] text-[#FBFBFB] cursor-pointer' : 'bg-[#EAECF1] text-[#95979F] cursor-not-allowed'}  text-xs rounded-[3px] font-medium`}
        >
          등록
        </button>
      </div>
      <div className="h-full box-border pb-[26px] px-5 max-w-[520px]">
        <div className="mb-8">
          <p className="font-medium mb-3">유실물 상세정보</p>
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
                <div className="relative min-w-16">
                  <img
                    className="border size-16 rounded-[10px] border-[#CED0DD] ml-2"
                    src={image.url}
                    key={`${image.data}-${index}`}
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
          <div className="flex items-center font-medium mb-3">
            <p className="mr-1">카테고리</p>
            <span className="inline-block w-[5px] h-[5px] bg-red-500 rounded-full" />
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
              className="box-border px-[12px] py-[7px] rounded text-sm border font-semibold text-[#33333E] mr-2.5 peer-checked/lost:border-[#2ACF6C] peer-checked/lost:bg-[#2ACF6C] peer-checked/lost:text-[#FBFBFB]"
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
              className="box-border px-[12px] py-[7px] rounded text-sm border font-semibold text-[#33333E]  peer-checked/acquire:border-[#2ACF6C] peer-checked/acquire:bg-[#2ACF6C] peer-checked/acquire:text-[#FBFBFB]"
            >
              습득물
            </label>
          </fieldset>
        </div>
        <div className="mb-8">
          <div className="flex items-center font-medium mb-3">
            <p className="mr-1">호선 선택</p>
            <span className="inline-block w-[5px] h-[5px] bg-red-500 rounded-full" />
          </div>
          <SelectLineDrawer
            subwayLineId={subwayLineId}
            setSubwayLineId={setSubwayLineId}
          />
        </div>
        <div className="mb-8">
          <div className="flex items-center font-medium mb-3">
            <p className="mr-1">제목</p>
            <span className="inline-block w-[5px] h-[5px] bg-red-500 rounded-full" />
          </div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border py-3 pl-3 pr-4 outline-none rounded-[5px]"
          />
        </div>
        <div className="relative w-full h-[200px] mb-[32px]">
          <div className="flex items-center font-medium mb-3">
            <p className="mr-1">자세한 설명</p>
            <span className="inline-block w-[5px] h-[5px] bg-red-500 rounded-full" />
          </div>
          <Editor
            placeholder={
              '게시글 내용을 작성해 주세요.\n\n서비스 정책에 맞지 않을 경우\n자동으로 게시판 이동 혹은 삭제 처리 될 수 있습니다.'
            }
            initialState={lostFoundDetailInfo?.content}
            onChange={onChangeEditorContent}
          />
        </div>
      </div>
    </form>
  );
};

export default LostFoundForm;
