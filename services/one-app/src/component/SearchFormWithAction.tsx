'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  name?: string;
};

export default function SearchFormWithAction({ name = 'keyword' }: Props) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(name) ?? '';

  const router = useRouter();
  const onSubmit = (formData: FormData) => {
    // FormData에서 input 값들을 가져옵니다
    const newKeyword = formData.get(name) as string;

    // 현재 URL의 검색 파라미터를 복사
    let newSearchParams = new URLSearchParams(searchParams);

    // 새로운 keyword 값을 설정
    newSearchParams.set(name, newKeyword);

    // 새로운 URL로 이동
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <Form
      action={onSubmit}
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
        name={name}
        defaultValue={defaultValue}
        placeholder="검색"
        className="w-full h-[36px] text-[15px] text-gray-90 bg-gray-20 pr-[12px] pl-0.5"
        style={{ caretColor: 'rgba(0, 255, 163, 0.5)' }}
      />
    </Form>
  );
}
