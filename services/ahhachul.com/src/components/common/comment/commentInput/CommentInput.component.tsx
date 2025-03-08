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

import * as S from './CommentInput.styled';

import Placeholder from '../../editor/placeholder/Placeholder.component';
import { OnChangePlugin } from '../../editor/plugins';

interface CommentInputProps {
  disabled?: boolean;
  placeholder?: string;
  initialState?: string;
  shouldFocusOnMount?: boolean;
  showIsPrivateBtn?: boolean;
  actionLabel?: string;
  disablePrivateCheck?: boolean;
  onSubmit: ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => void;
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
        console.error(error);
      },
    };

    const [comment, setComment] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

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
  showIsPrivateBtn,
  actionLabel,
  disablePrivateCheck,
  onSubmit,
}: {
  comment: string;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  showIsPrivateBtn?: boolean;
  disablePrivateCheck?: boolean;
  actionLabel?: string;
  onSubmit: ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => void;
}) => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const [editor] = useLexicalComposerContext();

  const clear = () => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });

    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable="true"]');
      if (editorElement instanceof HTMLElement) {
        editorElement.blur();
      }
    }, 0);
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    onSubmit({
      isPrivate: showIsPrivateBtn ? isPrivate : false,
      comment,
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
    </S.SubmitBox>
  );
};

CommentInput.displayName = 'CommentInput';

export default CommentInput;
