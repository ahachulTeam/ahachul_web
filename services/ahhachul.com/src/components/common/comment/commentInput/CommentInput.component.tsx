import React, { useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $getRoot, type EditorState } from 'lexical';

import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommentInput.styled';

import Placeholder from '../../editor/placeholder/Placeholder.component';
import { OnChangePlugin } from '../../editor/plugins';

const EDITOR_BLUR_DELAY_MS = 0;
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
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);

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
            imageUrlInput={imageUrlInput}
            imageUrls={imageUrls}
            setImageUrlInput={setImageUrlInput}
            setImageUrls={setImageUrls}
            imageError={imageError}
            setImageError={setImageError}
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
  imageUrlInput,
  imageUrls,
  setImageUrlInput,
  setImageUrls,
  imageError,
  setImageError,
  showIsPrivateBtn,
  actionLabel,
  disablePrivateCheck,
  onSubmit,
}: {
  comment: string;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrlInput: string;
  imageUrls: string[];
  setImageUrlInput: React.Dispatch<React.SetStateAction<string>>;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  imageError: string | null;
  setImageError: React.Dispatch<React.SetStateAction<string | null>>;
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

  const handleAddImageUrl = () => {
    const normalized = imageUrlInput.trim();
    if (!normalized) {
      return;
    }
    if (!/^https?:\/\/\S+$/i.test(normalized)) {
      setImageError('이미지 URL은 http(s)로 시작해야 합니다.');
      return;
    }
    if (imageUrls.includes(normalized)) {
      setImageUrlInput('');
      return;
    }
    setImageUrls(prev => [...prev, normalized].slice(0, 8));
    setImageUrlInput('');
    setImageError(null);
  };

  const clear = () => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
    setImageUrlInput('');
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
        >
          취소
        </button>
        <button type="button" onClick={handleSubmit}>
          {actionLabel}
        </button>
      </S.ButtonGroup>
      <S.ImageUrlRow>
        <input
          type="url"
          value={imageUrlInput}
          onChange={event => setImageUrlInput(event.target.value)}
          placeholder="https:// 이미지/GIF URL"
        />
        <button type="button" onClick={handleAddImageUrl}>
          이미지 추가
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
