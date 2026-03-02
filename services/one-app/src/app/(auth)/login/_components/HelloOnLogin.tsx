import { LogoIcon, LogoTextIcon } from '@/assets/icon';

type HelloOnLoginProps = {
  subtitle: string;
};

export function HelloOnLogin({ subtitle }: HelloOnLoginProps) {
  return (
    <article className="relative z-10 flex items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/90 shadow-[0_10px_24px_rgba(11,15,26,0.16)]">
        <LogoTextIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-label-medium text-gray-80">{subtitle}</span>
        <LogoIcon />
        <span className="mt-1 text-body-small text-gray-70">
          실시간 이동, 커뮤니티, 민원/유실물까지 한 번에
        </span>
      </div>
    </article>
  );
}
