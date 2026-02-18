import Form from 'next/form';

import { SearchIcon } from '@/assets/icon';

type Props = {
  searchTo: string;
  keyword?: string;
  category?: string;
  subwayLineId?: string;
};

export default function SearchFormServerAction({
  searchTo,
  keyword,
  category,
  subwayLineId,
}: Props) {
  return (
    <Form
      action={searchTo}
      className=" relative pl-[8px] flex items-center bg-gray-20 rounded-[9px] my-0 mx-auto w-[calc(100%-40px)] h-9 overflow-hidden"
    >
      <SearchIcon width={20} height={20} />
      <input
        type="search"
        name="keyword"
        defaultValue={keyword}
        placeholder="검색"
        className="w-full h-[36px] text-[15px] text-gray-90 bg-gray-20 pr-[12px] pl-0.5"
        style={{ caretColor: 'rgba(0, 255, 163, 0.5)' }}
      />
      {category && <input type="hidden" name="category" defaultValue={category} />}
      {subwayLineId && <input type="hidden" name="subwayLineId" defaultValue={subwayLineId} />}
    </Form>
  );
}
