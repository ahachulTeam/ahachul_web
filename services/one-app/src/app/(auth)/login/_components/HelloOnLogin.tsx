import { LogoIcon, LogoTextIcon } from '@/assets/icon';

type HelloOnLoginProps = {
  subtitle: string;
};

export function HelloOnLogin({ subtitle }: HelloOnLoginProps) {
  return (
    <article className="absolute left-1/2 top-[17.8%] flex -translate-x-1/2 items-center gap-3">
      <LogoTextIcon />
      <div className="flex flex-col gap-2">
        <span className="text-16m text-white">{subtitle}</span>
        <LogoIcon />
      </div>
    </article>
  );
}
