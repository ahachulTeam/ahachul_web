'use client';

import Form from 'next/form';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { SearchIcon } from '@/assets/icon';

type Props = {
  name?: string;
};

export default function SearchForm({ name = 'keyword' }: Props) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(name) ?? '';
  const pathname = usePathname() ?? '/';

  const router = useRouter();
  const onSubmit = (formData: FormData) => {
    const newKeyword = (formData.get(name) as string).trim();

    let newSearchParams = new URLSearchParams(searchParams);

    if (newKeyword.length) {
      newSearchParams.set(name, newKeyword);
    } else {
      newSearchParams.delete(name);
    }

    const queryString = newSearchParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <Form
      action={onSubmit}
      className="ah-glass-card relative flex h-11 w-full items-center gap-2 overflow-hidden rounded-2xl border border-white/70 bg-white/88 px-3 shadow-[0_8px_20px_rgba(15,21,33,0.08)]"
    >
      <label htmlFor={`search-${name}`} className="sr-only">
        검색
      </label>
      <SearchIcon width={20} height={20} />
      <input
        id={`search-${name}`}
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder="검색"
        className="h-full w-full bg-transparent pr-1 text-title-small text-gray-90 placeholder:text-gray-70"
        style={{ caretColor: 'rgba(0, 255, 163, 0.5)' }}
      />
    </Form>
  );
}
