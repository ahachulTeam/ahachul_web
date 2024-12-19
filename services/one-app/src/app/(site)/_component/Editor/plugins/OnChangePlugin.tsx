import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, EditorState, ElementNode } from 'lexical';
import { useEffect } from 'react';

type Params = {
  initialState: string;
  onChange: (editorState: EditorState | null) => void;
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

function OnChangePlugin({ initialState, onChange }: Params) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialState) {
      const content = editor.parseEditorState(JSON.parse(initialState));
      setTimeout(() => {
        editor.setEditorState(content);
      });
    }
  }, [initialState]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.read(() => {
        onChange?.(isEditorEmpty() ? null : editorState);
      });
    });
  }, [editor, onChange]);

  return null;
}

export default OnChangePlugin;
