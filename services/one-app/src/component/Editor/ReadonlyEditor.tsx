import { Editor } from '.';

import { cn } from '@/util/cn';

export type Props = {
  content: string;
  className?: string;
};

export const ReadonlyEditor = ({ content, className }: Props) => {
  return (
    <div className={cn(' w-full p-5 relative', className)}>
      <Editor readonly initialState={content} />
    </div>
  );
};
