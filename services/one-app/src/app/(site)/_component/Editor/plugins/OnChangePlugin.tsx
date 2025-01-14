'use client';

import { useEffect } from 'react';
import { $getRoot, EditorState, ElementNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  readonly?: boolean;
  initialState?: string;
  onChange?: (editorState: EditorState | null) => void;
};

const isEditorEmpty = () => {
  const root = $getRoot();
  const firstChild = root.getFirstChild();

  // 타입 가드로 `ElementNode` 확인
  if (firstChild instanceof ElementNode) {
    return firstChild.isEmpty() && root.getChildrenSize() === 1;
  }
  // 비어있지 않다고 간주
  return false;
};

export function OnChangePlugin({ readonly, initialState, onChange }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (readonly) {
      setTimeout(() => {
        editor.setEditable(false);
      });
    }

    if (initialState) {
      const content = editor.parseEditorState(JSON.parse(initialState));
      setTimeout(() => {
        editor.setEditorState(content);
      });
    }
  }, [readonly, initialState]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.read(() => {
        onChange?.(isEditorEmpty() ? null : editorState);
      });
    });
  }, [editor, onChange]);

  return null;
}
