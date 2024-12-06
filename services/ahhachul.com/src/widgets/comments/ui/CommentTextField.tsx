import React, { useEffect } from 'react';
import { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from '@lexical/react/LexicalAutoLinkPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import * as styles from '../../../shared/ui/Editor/Editor.css';
import styled from '@emotion/styled';

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text.startsWith('http') ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

const editorTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    hashtag: 'editor-text-hashtag',
    underline: 'editor-text-underline',
    strikethrough: 'editor-text-strikethrough',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
    code: 'editor-text-code',
  },
  code: 'editor-code',
  hashtag: 'editor-hashtag',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

const editorConfig = {
  namespace: 'editor',
  // The editor theme
  theme: editorTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here

  nodes: [AutoLinkNode, LinkNode],
};

function OnChangePlugin({
  onChange,
}: {
  onChange: (content: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange?.(editorState);
    });
  }, [editor, onChange]);

  return null;
}

const SubmitField = ({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: () => void;
}) => {
  return (
    <SubmitBox className="toolbar-wrapper">
      <div>
        <div id="box" />
        <button type="button">비공개 댓글</button>
      </div>
      <button
        type="button"
        disabled={disabled}
        css={{ padding: '0 !important' }}
        onClick={onSubmit}
      >
        등록
      </button>
    </SubmitBox>
  );
};

interface CommentTextFieldProps {
  disabled: boolean;
  placeholder: string;
  onChange: (content: EditorState) => void;
  onSubmit: () => void;
}

const CommentTextField = React.memo(
  ({ disabled, placeholder, onChange, onSubmit }: CommentTextFieldProps) => {
    return (
      <CommentTextFieldWrap>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container" css={styles.wrap(false)}>
            <div className="editor-inner">
              <PlainTextPlugin
                contentEditable={
                  <ContentEditable
                    id="content"
                    className="editor-input"
                    css={{ padding: '15px 10px' }}
                  />
                }
                placeholder={
                  <pre className="editor-placeholder">{placeholder}</pre>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <LinkPlugin />
              <AutoLinkPlugin matchers={MATCHERS} />
              <OnChangePlugin onChange={onChange} />
              <SubmitField disabled={disabled} onSubmit={onSubmit} />
            </div>
          </div>
        </LexicalComposer>
      </CommentTextFieldWrap>
    );
  },
);

const CommentTextFieldWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 90;
  background-color: #141517;

  & > div.editor-container {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-color: rgba(223, 232, 250, 0.45);

    .editor-inner {
      .editor-input {
        box-sizing: content-box;
        min-height: 56px !important;
        max-height: 130px !important;
        overflow-y: scroll;

        & > p:not(:last-of-type) {
          margin-bottom: 4px !important;
        }
      }
    }
  }
`;

const SubmitBox = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #141517;
  padding: 6px 8px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgb(196, 212, 252, 0.2);

  & > div {
    display: flex;
    align-items: center;
    height: 32px;

    & > div {
      width: 14px;
      height: 14px;
      border-radius: 7px;
      border: 1px solid rgb(101, 103, 107);
      background-color: #fff;
    }

    & > button {
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      color: #fff;
      font-size: 14px;
      margin-left: 6px;
      cursor: pointer;
    }
  }

  & > button {
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    padding: 5px 8px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 6px;
    background-color: rgba(0, 255, 163, 0.5);

    &:disabled {
      opacity: 0.5;
      background-color: rgb(101, 103, 107);
    }
  }
`;

export default CommentTextField;
