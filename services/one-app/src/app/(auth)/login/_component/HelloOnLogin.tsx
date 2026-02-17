import { LogoIcon, LogoTextIcon } from '@/asset/icon';

type HelloOnLoginProps = {
  subtitle: string;
};

export function HelloOnLogin({ subtitle }: HelloOnLoginProps) {
  return (
    <article className="absolute top-[17.8%] left-1/2 transform -translate-x-1/2 flex items-center">
      <LogoIcon />
      <div className="flex flex-col ml-3">
        <span className="text-text-50 text-white mb-2">{subtitle}</span>
        <LogoTextIcon />
      </div>
    </article>
  );
}
