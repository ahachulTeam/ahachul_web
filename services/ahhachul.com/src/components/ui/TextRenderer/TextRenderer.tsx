import React, { useEffect } from 'react';
import { Editor as ReadOnlyRenderer, EditorState, convertFromRaw } from 'draft-js';
import { css } from '@emotion/react';

import { linkDecorator } from './decorators/link';
import { imageBlockRenderer } from './InnerImage';

export type AwesomeRendererProps = {
  article: any;
};

function TextRenderer({ article }: AwesomeRendererProps) {
  const emptyState = EditorState.createEmpty(linkDecorator);
  const [editorState, setEditorState] = React.useState<EditorState>(emptyState);

  useEffect(() => {
    const initialState = EditorState.createWithContent(convertFromRaw(JSON.parse(article)), linkDecorator);
    setEditorState(initialState);
  }, [article]);

  return (
    <div css={wrapperStyle}>
      <div className="editor-container">
        <div className="editor-inner">
          <div className="content-container">
            <ReadOnlyRenderer
              readOnly={true}
              editorState={editorState}
              onChange={setEditorState}
              blockRendererFn={imageBlockRenderer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapperStyle = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  .DraftEditor-root {
    margin-bottom: 2rem;
    border-radius: 0.5rem;
  }

  .editor-container .editor-inner {
    border-radius: 8px;
  }

  .editor-container .editor-inner {
    border: none;
    border-radius: 4px;
  }

  .editor-container .editor-inner .content-container blockquote {
    border-left: 5px solid #2196f3;
    padding: 12px 10px 10px 20px;
  }

  .content-container blockquote {
    font-size: 15px;
    line-height: 1.625;
  }

  .editor-container .editor-inner .content-container pre {
    color: ffffff;
    padding: 7px;
    font-size: 15px;
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
    content: '🔴 🟡 🟢';
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
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New' !important;
  }

  @media (max-width: 768px) {
    .public-DraftEditor-content {
      color: #c9cedc;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 155%; /* 24.8px */
      letter-spacing: 0.16px;
    }

    .editor-container .editor-inner .content-container blockquote {
      line-height: 1.825;
    }

    .content-container blockquote {
      font-size: 15px;
      line-height: 1.1rem;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .editor-container .editor-inner .content-container pre {
      font-size: 15px;
    }

    .editor-container .editor-inner .content-container pre pre::before {
      width: 53px;
      left: 19px;
    }
  }
`;

export default TextRenderer;
