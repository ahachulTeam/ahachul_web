import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { HashtagNode } from '@lexical/hashtag';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from '@lexical/react/LexicalAutoLinkPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isParentElementRTL, $isAtNodeEnd } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  EditorState,
} from 'lexical';

import * as styles from './Editor.css';
import { ImageNode } from './nodes/ImageNode';
import { YouTubeNode } from './nodes/YouTubeNode';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import ImagesPlugin, { FileInput, INSERT_IMAGE_COMMAND } from './plugins/ImagesPlugin';
import SpeechToTextPlugin, { SPEECH_TO_TEXT_COMMAND } from './plugins/SpeechToTextPlugin';
import { SpeechToTextToolbarPlugin } from './plugins/SpeechToTextToolbarPlugin';
import { YouTubePlugin } from './plugins/YouTubePlugin';
import { BoldIcon } from './static/icons/bold';
import { CenterAlignIcon } from './static/icons/centerAlign';
import { ItalicIcon } from './static/icons/italic';
import { LeftAlignIcon } from './static/icons/leftAlign';
import { MicIcon } from './static/icons/mic';
import { RedoIcon } from './static/icons/redo';
import { RightAlignIcon } from './static/icons/rightAlign';
import { StrikethroughIcon } from './static/icons/strikethrough';
import { UnderlineIcon } from './static/icons/underline';
import { UndoIcon } from './static/icons/undo';
import { UploadIcon } from './static/icons/upload';
import { YoutubeIcon } from './static/icons/youtube';

let SUPPORT_SPEECH_RECOGNITION = false;
if (typeof window !== 'undefined') {
  SUPPORT_SPEECH_RECOGNITION = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

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

  nodes: [HeadingNode, QuoteNode, AutoLinkNode, LinkNode, HashtagNode, YouTubeNode, ImageNode],
};

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, text => {
    return text.startsWith('http') ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, text => {
    return `mailto:${text}`;
  }),
];

const LowPriority = 1;

function Placeholder({ placeholder = '게시글 내용을 작성해 주세요.' }: { placeholder?: string }) {
  return <pre className="editor-placeholder">{placeholder}</pre>;
}

interface EditorProps {
  isRich?: boolean;
  hasError?: boolean;
  readonly?: boolean;
  initialState?: string;
  placeholder?: string;
  onChange?: (content: EditorState) => void;
}

function OnChangePlugin({
  readonly,
  initialState,
  onChange,
}: {
  readonly?: EditorProps['readonly'];
  initialState?: EditorProps['initialState'];
  onChange: EditorProps['onChange'];
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // https://github.com/ueberdosis/tiptap/issues/3764
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
      onChange?.(editorState);
    });
  }, [editor, onChange]);

  return null;
}

const Editor = React.memo(
  ({
    isRich = false,
    hasError = false,
    readonly = false,
    initialState,
    placeholder,
    onChange,
  }: EditorProps) => {
    return (
      <LexicalComposer initialConfig={editorConfig}>
        <div
          className="editor-container"
          css={[
            styles.wrap(readonly),
            {
              borderColor: readonly
                ? 'rgba(0, 0, 0, 0)'
                : hasError
                  ? '#E02020'
                  : 'rgb(196, 212, 252, 0.37)',
            },
          ]}
        >
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  id="content"
                  css={{ padding: readonly ? 0 : '15px 10px' }}
                />
              }
              placeholder={readonly ? null : <Placeholder placeholder={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <LinkPlugin />
            <HashtagPlugin />
            <SpeechToTextPlugin />
            <AutoLinkPlugin matchers={MATCHERS} />
            <OnChangePlugin readonly={readonly} initialState={initialState} onChange={onChange} />
            {isRich && (
              <>
                <ImagesPlugin />
                <ToolbarPlugin />
                <YouTubePlugin />
                <HistoryPlugin />
                <AutoEmbedPlugin />
              </>
            )}
            {!readonly && !isRich && <SpeechToTextToolbarPlugin />}
          </div>
        </div>
      </LexicalComposer>
    );
  },
);

Editor.displayName = 'Editor';

function Divider() {
  return <div className="divider" />;
}

function positionEditorElement(editor: any, rect: any) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = '50%';
    editor.style.transform = 'translate(-50%)';
  }
}

function FloatingLinkEditor({ editor }: any) {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection?.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      let rect;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: any) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={event => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [activeEditor] = useState(editor);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [, setBlockType] = useState('paragraph');
  const [, setSelectedElementKey] = useState(null);
  const [, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  // SPEECH to TEXT
  const [isSpeechToText, setIsSpeechToText] = useState(false);

  // IMAGE
  const loadImage = (files: FileList | null) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        onFocus?.();
        activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          altText: '',
          src: reader.result,
        });
      }
      return '';
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  const onFocus = () => {
    const contentInput = document?.getElementById('content');
    contentInput?.focus?.();
  };

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        const type = $isHeadingNode(element) ? element.getTag() : element.getType();
        setBlockType(type);
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _payload => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  return (
    <article className="toolbar-wrapper">
      <div className="toolbar" ref={toolbarRef}>
        <button
          type="button"
          onClick={() => {
            !isBold && onFocus?.();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          aria-label="Format Bold"
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            !isItalic && onFocus?.();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          aria-label="Format Italics"
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            !isUnderline && onFocus?.();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
          aria-label="Format Underline"
        >
          <UnderlineIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            !isStrikethrough && onFocus?.();
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
          aria-label="Format Strikethrough"
        >
          <StrikethroughIcon />
        </button>
        {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
        <Divider />
        <button
          type="button"
          onClick={() => {
            onFocus?.();
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          className="toolbar-item spaced"
          aria-label="Left Align"
        >
          <LeftAlignIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            onFocus?.();
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          className="toolbar-item spaced"
          aria-label="Center Align"
        >
          <CenterAlignIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            onFocus?.();
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <RightAlignIcon />
        </button>
        <Divider />
        <button
          type="button"
          className="toolbar-item spaced"
          aria-label="Insert Image"
          onClick={() => {
            const input = document?.getElementById('file-input');
            input?.click();
          }}
        >
          <UploadIcon />
          <FileInput
            label="Image Upload"
            onChange={loadImage}
            accept="image/*"
            data-test-id="image-modal-file-upload"
          />
        </button>
        <button
          type="button"
          className="toolbar-item spaced"
          aria-label="Youtube Video"
          onClick={() => {
            activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, 'youtube-video');
          }}
        >
          <YoutubeIcon />
        </button>
        {SUPPORT_SPEECH_RECOGNITION && (
          <button
            type="button"
            className={'toolbar-item spaced mic ' + (isSpeechToText ? 'active' : '')}
            title="Speech To Text"
            aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`}
            onClick={() => {
              editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
              setIsSpeechToText(!isSpeechToText);
            }}
          >
            <MicIcon />
          </button>
        )}
        <Divider />
        <button
          type="button"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, null);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <UndoIcon />
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, null);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <RedoIcon />
        </button>
      </div>
    </article>
  );
}

export default Editor;
