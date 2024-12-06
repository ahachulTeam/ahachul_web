import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

function OnChangePlugin({ initialState, onChange }: any) {
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
      onChange?.(editorState);
    });
  }, [editor, onChange]);

  return null;
}

export default OnChangePlugin;
