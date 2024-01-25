import React from "react";
import { css } from "@emotion/react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftEditorCommand,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { imageBlockRenderer } from "./InnerImage";
import { linkDecorator } from "./decorators/link";

const TextEditor = () => {
  const initialState = EditorState.createEmpty(linkDecorator);
  const [editorState, setEditorState] =
    React.useState<EditorState>(initialState);

  const onChange = (newState: EditorState) => {
    setEditorState(EditorState.set(newState, {}));
  };

  const handleInsertImage = () => {
    const src = prompt("Please enter the URL of your picture");
    if (!src) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "),
    );
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    let newState;
    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e: any) => getDefaultKeyBinding(e);

  const handleSave = () => {
    const article = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );
    console.log("article:", article);
  };

  return (
    <div css={wrapperStyle}>
      <div className="editor-container">
        <div className="editor-inner">
          <div className="content-container line-numbers">
            <Editor
              editorState={editorState}
              onChange={onChange}
              handleKeyCommand={handleKeyCommand}
              blockRendererFn={imageBlockRenderer}
              keyBindingFn={mapKeyToEditorCommand}
            />
          </div>
          <button
            className="toolbar-inner"
            onMouseDown={(e) => {
              e.preventDefault();
              handleInsertImage();
            }}
          >
            image
          </button>
          <button
            className="save"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;

const wrapperStyle = () => css`
  text-align: center;
  max-width: 100%;
  position: relative;

  .DraftEditor-root {
    margin: 1rem 0;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
  }

  .public-DraftEditor-content {
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .content-container .editor-inner {
    margin: 10px 0px 0px 0px;
    padding: 10px;
    -webkit-box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
    box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
    border-radius: 8px;
  }

  .editor-container .editor-inner .toolbar-container {
    margin-bottom: 10px;
  }

  .editor-container .editor-inner .content-container .align-left div {
    text-align: left;
  }

  .editor-container .editor-inner .content-container .align-center div {
    text-align: center;
  }

  .editor-container .editor-inner .content-container .align-right div {
    text-align: right;
  }

  .editor-container .editor-inner .toolbar-container .toolbar-inner {
    border: none;
    border-radius: 4px;
    padding: 4px;
    margin: 0px 4px;
  }

  .editor-container .editor-inner .content-container blockquote {
    border-left: 5px solid #2196f3;
    background-color: #e3f2fd;
    padding: 15px 10px 15px 20px;
  }

  .content-container blockquote {
    font-size: 1rem;
    line-height: 1.625;
  }

  .editor-container .editor-inner .content-container pre {
    color: #4b5567;
    padding: 7px;
    font-size: 0.875rem;
    background-color: #f7f6f3;
    -webkit-box-shadow: 0px 1px 10px rgba(19, 24, 48, 0.35);
    box-shadow: 0px 1px 10px rgba(19, 24, 48, 0.35);
    border-radius: 8px;
  }

  .editor-container .editor-inner .content-container pre pre {
    background-color: #f7f6f3;
    -webkit-box-shadow: 0.5px 0.5px 10px #e5e7eb -0.5px -0.5px 10px #e5e7eb;
    box-shadow:
      0px -0.7px 1px rgba(19, 24, 48, 0.25),
      0px 0.25px 1px rgba(19, 24, 48, 0.25);
    border-radius: 8px;
    padding: 25px;
    padding-top: 45px;
    position: relative;
  }

  .editor-container .editor-inner .content-container pre pre::before {
    content: "🔴 🟡 🟢";
    width: 70px;
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 7px;
    left: 21px;
    box-shadow: 0px -1px 1px rgba(19, 24, 48, 0.25);
    border-radius: 8px;
  }

  .editor-container .editor-inner .content-container pre pre span {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New" !important;
  }

  .toolbar-inner {
    border: none;
    color: #4b5563;
    padding: 0.5rem 1rem;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .save,
  .preview {
    border: none;
    padding: 0.5rem 1rem;
    margin: auto 0.5rem;
    background-color: #3ed3d2;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .select {
    position: absolute;
    bottom: 25px;
    right: 7.7px;
    color: #4b5563;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px;
    margin-left: 5rem;
    padding: 5px;
    padding-left: 10px;
    border: none;
    outline: none;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .select {
      font-size: 0.6rem !important;
    }

    .public-DraftEditor-content {
      font-size: 0.6rem !important;
    }

    .editor-container .editor-inner .content-container blockquote {
      border-left: 5px solid #2196f3;
      background-color: #e3f2fd;
      padding: 10px 10px 10px 20px;
    }

    .content-container blockquote {
      font-size: 0.7rem;
      line-height: 1rem;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .editor-container .editor-inner .content-container pre {
      font-size: 0.6rem;
    }

    .editor-container .editor-inner .content-container pre pre::before {
      width: 50px;
      left: 19px;
    }
  }
`;
