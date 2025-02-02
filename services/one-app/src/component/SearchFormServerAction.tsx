import Form from 'next/form';

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
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9.16659" cy="9.16668" r="4.83333" stroke="#95979F" strokeWidth="2" />
        <path
          d="M13.3333 13.3333L15.8333 15.8333"
          stroke="#95979F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
