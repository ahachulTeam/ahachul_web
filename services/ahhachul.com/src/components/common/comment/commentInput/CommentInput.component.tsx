import React, { useRef, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $getRoot, type EditorState } from 'lexical';

import { createS3Presigned } from '@/apis/request/common';
import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommentInput.styled';

import Placeholder from '../../editor/placeholder/Placeholder.component';
import { OnChangePlugin } from '../../editor/plugins';

const EDITOR_BLUR_DELAY_MS = 0;
const MAX_COMMENT_IMAGE_COUNT = 8;
const commentInputLogger = createActionLogger('comment-input');

interface CommentInputProps {
  disabled?: boolean;
  placeholder?: string;
  initialState?: string;
  shouldFocusOnMount?: boolean;
  showIsPrivateBtn?: boolean;
  actionLabel?: string;
  disablePrivateCheck?: boolean;
  onSubmit: ({
    isPrivate,
    comment,
    imageUrls,
  }: {
    isPrivate: boolean;
    comment: string;
    imageUrls: string[];
  }) => void;
}

const CommentInput = React.memo(
  ({
    placeholder,
    initialState,
    shouldFocusOnMount,
    showIsPrivateBtn,
    onSubmit,
    actionLabel = '등록',
    disabled = false,
    disablePrivateCheck = false,
  }: CommentInputProps) => {
    const initialConfig = {
      namespace: 'commentEditor',
      onError(error: Error) {
        commentInputLogger.fail(
          'runtime-error',
          error,
          undefined,
          '댓글 입력 처리 중 오류가 발생했습니다.',
        );
      },
    };

    const [comment, setComment] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);
    const [isImageUploading, setIsImageUploading] = useState(false);

    const onChangeEditorContent = (editorState: EditorState | null) => {
      if (editorState) {
        setComment(JSON.stringify(editorState.toJSON()));
      }
    };

    return (
      <S.Container>
        <LexicalComposer initialConfig={initialConfig}>
          <S.EditorContainer id="editor-container">
            <RichTextPlugin
              contentEditable={<ContentEditable css={[S.contentEditableCss(disabled)]} />}
              placeholder={<Placeholder placeholder={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin
              readonly={disabled}
              onChange={onChangeEditorContent}
              initialState={initialState}
              shouldFocusOnMount={shouldFocusOnMount}
            />
          </S.EditorContainer>
          <SubmitComment
            comment={comment}
            isPrivate={disablePrivateCheck || isPrivate}
            setIsPrivate={setIsPrivate}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageError={imageError}
            setImageError={setImageError}
            isImageUploading={isImageUploading}
            setIsImageUploading={setIsImageUploading}
            showIsPrivateBtn={showIsPrivateBtn}
            actionLabel={actionLabel}
            disablePrivateCheck={disablePrivateCheck}
            onSubmit={onSubmit}
          />
        </LexicalComposer>
      </S.Container>
    );
  },
);

const SubmitComment = ({
  comment,
  isPrivate,
  setIsPrivate,
  imageUrls,
  setImageUrls,
  imageError,
  setImageError,
  isImageUploading,
  setIsImageUploading,
  showIsPrivateBtn,
  actionLabel,
  disablePrivateCheck,
  onSubmit,
}: {
  comment: string;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  imageError: string | null;
  setImageError: React.Dispatch<React.SetStateAction<string | null>>;
  isImageUploading: boolean;
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>;
  showIsPrivateBtn?: boolean;
  disablePrivateCheck?: boolean;
  actionLabel?: string;
  onSubmit: ({
    isPrivate,
    comment,
    imageUrls,
  }: {
    isPrivate: boolean;
    comment: string;
    imageUrls: string[];
  }) => void;
}) => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const buildCommentImageS3Key = (file: File) => {
    const extension = file.name
      .split('.')
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 10);
    const randomKey =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

    if (!extension) {
      return `comments/${randomKey}`;
    }

    return `comments/${randomKey}.${extension}`;
  };

  const handlePickImages = () => {
    if (isImageUploading || imageUrls.length >= MAX_COMMENT_IMAGE_COUNT) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    const availableSlots = Math.max(0, MAX_COMMENT_IMAGE_COUNT - imageUrls.length);
    const filesForUpload = selectedFiles.slice(0, availableSlots);
    if (filesForUpload.length === 0) {
      setImageError('이미지는 최대 8장까지 첨부할 수 있습니다.');
      event.target.value = '';
      return;
    }

    setImageError(null);
    setIsImageUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        filesForUpload.map(async file => {
          const s3Key = buildCommentImageS3Key(file);
          const uploadedUrl = await createS3Presigned(s3Key, file);
          if (!uploadedUrl) {
            throw new Error('이미지 업로드 URL을 생성하지 못했습니다.');
          }
          return uploadedUrl;
        }),
      );

      setImageUrls(prev =>
        [...prev, ...uploadedUrls]
          .filter((url, index, urls) => urls.indexOf(url) === index)
          .slice(0, MAX_COMMENT_IMAGE_COUNT),
      );
    } catch {
      setImageError('이미지를 업로드하지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsImageUploading(false);
      event.target.value = '';
    }
  };

  const clear = () => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
    setImageUrls([]);
    setImageError(null);

    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable="true"]');
      if (editorElement instanceof HTMLElement) {
        editorElement.blur();
      }
    }, EDITOR_BLUR_DELAY_MS);
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    if (isImageUploading) {
      setImageError('이미지 업로드가 완료된 뒤 등록해주세요.');
      return;
    }

    onSubmit({
      isPrivate: showIsPrivateBtn ? isPrivate : false,
      comment,
      imageUrls,
    });
    clear();
  };

  return (
    <S.SubmitBox showIsPrivateBtn={showIsPrivateBtn}>
      {showIsPrivateBtn && (
        <UiComponent.Checkbox
          label="비공개 댓글"
          disabled={disablePrivateCheck}
          checked={isPrivate}
          onChange={e => {
            if (disablePrivateCheck) {
              return;
            }

            setIsPrivate(e.target.checked);
            editor.focus();
          }}
        />
      )}
      <S.ButtonGroup>
        <button
          onClick={() => {
            setIsPrivate(false);
            clear();
          }}
          disabled={isImageUploading}
        >
          취소
        </button>
        <button type="button" onClick={handleSubmit} disabled={isImageUploading}>
          {actionLabel}
        </button>
      </S.ButtonGroup>
      <S.ImageUrlRow>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={event => {
            void handleUploadFiles(event);
          }}
          disabled={isImageUploading || imageUrls.length >= MAX_COMMENT_IMAGE_COUNT}
          hidden
        />
        <input
          type="text"
          value={`첨부 이미지 ${imageUrls.length}/${MAX_COMMENT_IMAGE_COUNT}`}
          readOnly
        />
        <button
          type="button"
          onClick={handlePickImages}
          disabled={isImageUploading || imageUrls.length >= MAX_COMMENT_IMAGE_COUNT}
        >
          {isImageUploading ? '업로드 중...' : '이미지 선택'}
        </button>
      </S.ImageUrlRow>
      {imageError ? <S.ImageError>{imageError}</S.ImageError> : null}
      {imageUrls.length > 0 ? (
        <S.ImagePreviewList>
          {imageUrls.map(url => (
            <li key={url}>
              <img src={url} alt="첨부 이미지" />
              <button
                type="button"
                onClick={() => setImageUrls(prev => prev.filter(item => item !== url))}
              >
                삭제
              </button>
            </li>
          ))}
        </S.ImagePreviewList>
      ) : null}
    </S.SubmitBox>
  );
};

CommentInput.displayName = 'CommentInput';

export default CommentInput;
