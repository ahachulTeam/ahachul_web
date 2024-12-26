import React from 'react';

import Editor from '@/app/(site)/_component/Editor';
import { EditorState } from 'lexical';
import { cn } from '@/common/utils/cn';

interface CommentTextFieldProps {
  placeholder: string;
  readonly?: boolean;
  initialState?: string;
  shouldFocusOnMount?: boolean;
}

const CommentTextField = React.memo(
  ({ placeholder }: CommentTextFieldProps) => {
    const handleChange = (content: EditorState | null) => {
      console.log('content', content);
    };
    const handleSubmit = () => {};

    return (
      <div className=" fixed bottom-0 left-0 w-full z-50 bg-gray-0 flex flex-col gap-4 pb-4 px-4 border-t border-t-gray-30">
        <div
          className={cn(
            'p-0',
            'pt-4',
            '[&>div>div]:p-0',
            '[&>div>div]:border-none',
            '[&>div>div]:min-h-[55px]',
            '[&>div>div]:max-h-[130px]',
            '[&>div>#editor-placeholder]:top-0',
            '[&>div>#editor-placeholder]:left-0',
          )}
        >
          <Editor placeholder={placeholder} onChange={handleChange} />
        </div>
        <div className=" w-full bg-gray-0 flex items-center justify-between">
          <div className=" flex items-center gap-1">
            <div className=" border border-gray-70 rounded-sm w-[18px] h-[18px]" />
            <button type="button" className=" text-body-medium text-gray-90">
              비공개 댓글
            </button>
          </div>
          <div className=" flex items-center gap-3">
            <button
              type="button"
              className=" text-body-small text-gray-90 h-[30px] flex items-center justify-center border border-gray-40 bg-gray-0 px-[13px] rounded-[3px]"
            >
              취소
            </button>
            <button
              type="button"
              className=" text-body-small text-gray-90 h-[30px] flex items-center justify-cente border border-gray-40 bg-gray-0 px-[13px] rounded-[3px]"
              onClick={handleSubmit}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default CommentTextField;
