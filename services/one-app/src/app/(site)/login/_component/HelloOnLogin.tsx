<<<<<<< HEAD
import { LogoIcon, LogoTextIcon } from '@/common/assets/icons';
=======
import LogoIcon from '@/common/assets/icons/logo';
import LogoTextIcon from '@/common/assets/icons/logo-text';
>>>>>>> main

export const HelloOnLogin: React.FC = () => {
  return (
    <article className="absolute top-[17.8%] left-1/2 transform -translate-x-1/2 flex items-center">
      <LogoIcon />
      <div className="flex flex-col ml-3">
        <span className="text-text-50 text-white mb-2">
          더 편한 지하철을 만드는
        </span>
        <LogoTextIcon />
      </div>
    </article>
  );
};
