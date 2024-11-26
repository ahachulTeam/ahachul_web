'use client';

import ArrowLeftIcon from '@/common/assets/icons/arrow-left';
import ImagePlaceHolder from '@/common/assets/icons/image-placeholder';
import SelectLineDrawer from './SelectLineDrawer';

import type { LostFound } from '@/model/LostFound';

type Props = {
  lostFoundData: LostFound | null;
};

const LostFoundForm = ({ lostFoundData }: Props) => {
  return (
    <>
      <div className="flex justify-between h-[50px] px-[20px] py-[12px]">
        <ArrowLeftIcon />
        <button className="px-[13px] py-[6px] bg-[#2ACF6C] text-[#FBFBFB] text-xs rounded-[3px] font-medium">
          등록
        </button>
      </div>
      <form className="px-5 max-w-[520px]">
        <div className="mb-8">
          <p className="font-medium mb-3">유실물 상세정보</p>
          <label
            htmlFor="image-upload"
            className="flex justify-center items-center size-16 border rounded-[10px] border-[#CED0DD] cursor-pointer"
          >
            <ImagePlaceHolder />
            <input
              id="image-upload"
              type="file"
              className="hidden"
              multiple
            ></input>
          </label>
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
          <SelectLineDrawer />
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
          <div className="w-full border rounded-[5px] p-3">
            에디터 영역 (lexical로 전환 필요)
          </div>
        </div>
      </form>
    </>
  );
};

export default LostFoundForm;
