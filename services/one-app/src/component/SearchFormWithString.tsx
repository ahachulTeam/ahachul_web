'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
<<<<<<< HEAD:services/one-app/src/component/SearchForm.tsx
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  name?: string;
};

export default function SearchForm({ name = 'keyword' }: Props) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(name) ?? '';

  const router = useRouter();
  const onSubmit = (formData: FormData) => {
    const newKeyword = formData.get(name) as string;

    let newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(name, newKeyword);

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <Form
      action={onSubmit}
=======

type Props = {
  searchTo: string;
};

export default function SearchForm({ searchTo }: Props) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const category = searchParams.get('category');
  const subwayLineId = searchParams.get('subwayLineId');

  return (
    <Form
      action={searchTo}
>>>>>>> develop:services/one-app/src/component/SearchFormWithString.tsx
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
<<<<<<< HEAD:services/one-app/src/component/SearchForm.tsx
        name={name}
        defaultValue={defaultValue}
=======
        name="keyword"
        defaultValue={keyword}
>>>>>>> develop:services/one-app/src/component/SearchFormWithString.tsx
        placeholder="검색"
        className="w-full h-[36px] text-[15px] text-gray-90 bg-gray-20 pr-[12px] pl-0.5"
        style={{ caretColor: 'rgba(0, 255, 163, 0.5)' }}
      />
    </Form>
  );
}
