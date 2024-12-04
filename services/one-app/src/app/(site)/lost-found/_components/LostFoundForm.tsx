'use client';

import { useState } from 'react';
import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import CloseCircleIcon from '@/common/assets/icons/close-circle';
import ImagePlaceHolder from '@/common/assets/icons/image-placeholder';
import SelectLineDrawer from './SelectLineDrawer';

type Props = {
  lostFoundData?: any | null;
};

const MAX_IMAGE_LENGTH = 5;

const LostFoundForm = ({ lostFoundData = null }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [subwayLineId, setSubwayLineId] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_IMAGE_LENGTH) return;
    const fileBlob = e.target.files?.[0];
    if (!fileBlob) return;
    const fileUrl = URL.createObjectURL(fileBlob);
    setImages((prev) => [...prev, fileUrl]);
    e.target.value = '';
  };

  const onDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex justify-between px-[20px] py-[12px]">
        <ArrowLeftIcon />
        <button className="px-[13px] py-[6px] bg-[#2ACF6C] text-[#FBFBFB] text-xs rounded-[3px] font-medium">
          등록
        </button>
      </div>
      <form className="px-5 max-w-[520px] overflow-hidden">
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
            {images.map((curSrc, index) => {
              return (
                <div className="relative min-w-16">
                  <img
                    className="border size-16 rounded-[10px] border-[#CED0DD] ml-2"
                    src={curSrc}
                    key={`${curSrc}-${index}`}
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
              value="lost"
              defaultChecked
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
              value="acquire"
              id="acquire"
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
            className="w-full border py-3 pl-3 pr-4 outline-none rounded-[5px]"
          />
        </div>
        <div>
          <div className="flex items-center font-medium mb-3">
            <p className="mr-1">자세한 설명</p>
            <span className="inline-block w-[5px] h-[5px] bg-red-500 rounded-full" />
          </div>
          <textarea
            placeholder="게시글 내용을 작성해주세요."
            className="w-full border rounded-[5px] p-3"
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default LostFoundForm;
