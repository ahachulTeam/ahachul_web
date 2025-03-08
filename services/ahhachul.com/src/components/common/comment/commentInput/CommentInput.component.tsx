import React, { useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $getRoot, type EditorState } from 'lexical';

import { UiComponent } from '@/components';

import * as S from './CommentInput.styled';

import Placeholder from '../../editor/placeholder/Placeholder.component';
import { OnChangePlugin } from '../../editor/plugins';

interface CommentInputProps {
  disabled?: boolean;
  placeholder?: string;
  initialState?: string;
  shouldFocusOnMount?: boolean;
  showIsPrivateBtn?: boolean;
  onSubmit: ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => void;
}

const CommentInput = React.memo(
  ({
    placeholder,
    initialState,
    // shouldFocusOnMount,
    showIsPrivateBtn,
    onSubmit,
    disabled = false,
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
            />
          </S.EditorContainer>
          <SubmitComment
            comment={comment}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            showIsPrivateBtn={showIsPrivateBtn}
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
  onSubmit,
}: {
  comment: string;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  showIsPrivateBtn?: boolean;
  onSubmit: ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  const clear = () => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
    editor.blur();
  };

  const handleSubmit = () => {
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
          checked={isPrivate}
          onChange={e => setIsPrivate(e.target.checked)}
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
          등록
        </button>
      </S.ButtonGroup>
    </S.SubmitBox>
  );
};

CommentInput.displayName = 'CommentInput';

export default CommentInput;
