import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, EditorState, ElementNode } from 'lexical';

type Props = {
  readonly?: boolean;
  initialState?: string;
  shouldFocusOnMount?: boolean;
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

export function OnChangePlugin({ readonly, initialState, shouldFocusOnMount, onChange }: Props) {
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

    if (shouldFocusOnMount) {
      setTimeout(() => {
        const editorElement = document.querySelector('[contenteditable="true"]');
        if (editorElement instanceof HTMLElement) {
          editorElement.click();
        }
      }, 550);
    }
  }, [readonly, initialState, shouldFocusOnMount]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.read(() => {
        onChange?.(isEditorEmpty() ? null : editorState);
      });
    });
  }, [editor, onChange]);

  return null;
}
