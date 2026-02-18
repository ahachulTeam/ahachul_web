'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { SearchIcon } from '@/assets/icon';

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
      className=" relative pl-[8px] flex items-center bg-gray-20 rounded-[9px] my-0 mx-auto w-[calc(100%-40px)] h-9 overflow-hidden"
    >
      <SearchIcon width={20} height={20} />
      <input
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder="검색"
        className="w-full h-[36px] text-[15px] text-gray-90 bg-gray-20 pr-[12px] pl-0.5"
        style={{ caretColor: 'rgba(0, 255, 163, 0.5)' }}
      />
    </Form>
  );
}
