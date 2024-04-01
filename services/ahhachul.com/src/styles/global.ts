import { css } from '@emotion/react';

const global = css`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: 'pretendard';
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0; /* 3 */
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  * {
    margin: 0;
    font-family: 'pretendard';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html {
    font-family: 'pretendard';
    font-size: $font-size-16;
  }

  body {
    font-family: 'pretendard';
    color: $primary;
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  button {
    padding: 0;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }

  address {
    font-style: normal;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }
  pre {
    font-family: Pretendard, system-ui;
  }
  hr {
    height: 0;
    margin: 0;
    background: unset;
  }

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* 버튼 클릭시 나오는 하이라이트 제거 */
    -webkit-touch-callout: none; /* 링크를 오래 눌렀을때 액션 막기*/
    -webkit-user-select: none; /* 글자들 선택 안되게 막기 */
    -khtml-user-select: none; /* 글자들 선택 안되게 막기 */
    -moz-user-select: none; /* 글자들 선택 안되게 막기 */
    -ms-user-select: none; /* 글자들 선택 안되게 막기 */
    user-select: none; /* 글자들 선택 안되게 막기 */
    -webkit-user-drag: none; /* 이미지, 글자 drag 막기*/
  }

  /** EDITOR */

  .ltr {
    text-align: left;
  }

  .rtl {
    text-align: right;
  }

  .editor-container {
    border-radius: 2px;
    width: 100%;
    position: relative;
    line-height: 20px;
    font-weight: 400;
    text-align: left;
    border-radius: 6px;
    border: 1px solid rgb(196, 212, 252, 0.37);
  }

  .editor-inner {
    position: relative;
  }

  .editor-input {
    min-height: 150px;
    resize: none;
    font-size: 14px;
    position: relative;
    tab-size: 1;
    outline: 0;
    padding: 15px 10px;
    color: #ffffff;
    caret-color: rgba(0, 255, 163, 0.5);
  }

  .editor-placeholder {
    color: #9da5b6;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 15px;
    left: 10px;
    font-size: 14px;
    user-select: none;
    display: inline-block;
    pointer-events: none;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    background-color: rgb(240, 242, 245);
    padding: 1px 0.25rem;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  .editor-link {
    color: rgb(33, 111, 219);
    text-decoration: none;
  }

  .editor-hashtag {
    background-color: rgba(88, 144, 255, 0.15);
    border-bottom: 1px solid rgba(88, 144, 255, 0.3);
  }

  .tree-view-output {
    display: block;
    background: #141517;
    color: #fff;
    padding: 5px;
    font-size: 12px;
    white-space: pre-wrap;
    margin: 1px auto 10px auto;
    max-height: 250px;
    position: relative;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: auto;
    line-height: 14px;
  }

  .editor-code {
    background-color: rgb(240, 242, 245);
    font-family: Menlo, Consolas, Monaco, monospace;
    display: block;
    padding: 8px 8px 8px 52px;
    line-height: 1.53;
    font-size: 13px;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    tab-size: 2;
    /* white-space: pre; */
    overflow-x: auto;
    position: relative;
  }

  .editor-code:before {
    content: attr(data-gutter);
    position: absolute;
    background-color: #eee;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
    padding: 8px;
    color: #777;
    white-space: pre-wrap;
    text-align: right;
    min-width: 25px;
  }
  .editor-code:after {
    content: attr(data-highlight-language);
    top: 0;
    right: 3px;
    padding: 3px;
    font-size: 10px;
    text-transform: uppercase;
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
  }

  .editor-tokenComment {
    color: slategray;
  }

  .editor-tokenPunctuation {
    color: #999;
  }

  .editor-tokenProperty {
    color: #905;
  }

  .editor-tokenSelector {
    color: #690;
  }

  .editor-tokenOperator {
    color: #9a6e3a;
  }

  .editor-tokenAttr {
    color: #07a;
  }

  .editor-tokenVariable {
    color: #e90;
  }

  .editor-tokenFunction {
    color: #dd4a68;
  }

  .editor-paragraph {
    margin: 0;
    margin-bottom: 8px;
    position: relative;
  }

  .editor-paragraph:last-of-type {
    margin-bottom: 0;
  }

  .editor-heading-h1 {
    font-size: 24px;
    color: #c9cedc;
    font-weight: 400;
    margin: 0;
    margin-bottom: 12px;
    padding: 0;
  }

  .editor-heading-h2 {
    font-size: 18px;
    color: rgb(101, 103, 107);
    font-weight: 700;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    text-transform: uppercase;
  }

  .editor-quote {
    margin: 0;
    margin-left: 20px;
    font-size: 15px;
    color: rgb(101, 103, 107);
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  .editor-list-ol {
    padding: 0;
    margin: 0;
    margin-left: 16px;
  }

  .editor-list-ul {
    padding: 0;
    margin: 0;
    margin-left: 16px;
  }

  .editor-listitem {
    margin: 8px 32px 8px 32px;
  }

  .editor-nested-listitem {
    list-style-type: none;
  }

  pre::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  pre::-webkit-scrollbar-thumb {
    background: #999;
  }

  .tree-view-type-button {
  }

  .debug-timetravel-panel {
    display: none;
    overflow: hidden;
    padding: 0 0 10px 0;
    margin: auto;
    display: flex;
  }

  .debug-timetravel-panel-slider {
    display: none;
    padding: 0;
    flex: 8;
  }

  .debug-timetravel-panel-button {
    display: none;
    padding: 0;
    border: 0;
    background: none;
    flex: 1;
    color: #fff;
    font-size: 12px;
  }

  .debug-timetravel-panel-button:active {
    text-decoration: underline;
  }

  .debug-timetravel-button {
    display: none;
    border: 0;
    padding: 0;
    font-size: 12px;
    top: 10px;
    right: 15px;
    position: absolute;
    background: none;
    color: #fff;
  }

  .debug-timetravel-button:active {
    text-decoration: underline;
  }

  .emoji {
    color: transparent;
    background-size: 16px 16px;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin: 0 -1px;
  }

  .emoji-inner {
    padding: 0 0.15em;
  }

  .emoji-inner::selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .emoji-inner::moz-selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .toolbar {
    display: flex;
    background: inherit;
    padding: 4px;
    vertical-align: middle;
    overflow-x: scroll;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border: 1px solid hsla(0, 0%, 100%, 0.39);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    opacity: 0;
    will-change: opacity;
    animation: toolbar-fade-in 0.3s forwards;
  }

  @keyframes toolbar-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .toolbar button.toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    vertical-align: middle;
  }

  .toolbar button.toolbar-item:disabled {
    cursor: not-allowed;
  }

  .toolbar button.toolbar-item.spaced {
    margin-right: 2px;
  }

  .toolbar button.toolbar-item.spaced.mic.active {
    animation: mic-pulsate-color 3s infinite;
  }

  @keyframes mic-pulsate-color {
    0% {
      background-color: #ffdcdc;
    }

    50% {
      background-color: #ff8585;
    }

    100% {
      background-color: #ffdcdc;
    }
  }

  .toolbar button.toolbar-item .format {
    background-size: contain;
    display: inline-block;
    height: 18px;
    width: 18px;
    margin-top: 2px;
    vertical-align: -0.25em;
    display: flex;
    opacity: 0.6;
  }

  .toolbar button.toolbar-item:disabled .format {
    opacity: 0.2;
  }

  .toolbar button.toolbar-item.active {
    background-color: rgba(223, 232, 250, 0.3);
  }

  .toolbar button.toolbar-item.active .format {
    opacity: 1;
  }

  .toolbar .toolbar-item:active:not([disabled]) {
    background-color: #eee;
  }

  .toolbar .divider {
    width: 1px;
    background-color: rgba(223, 232, 250, 0.3) !important;
    margin: 0 4px;
  }

  .toolbar select.toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 70px;
    font-size: 14px;
    color: #777;
    text-overflow: ellipsis;
  }

  .toolbar select.code-language {
    text-transform: capitalize;
    width: 130px;
  }

  .toolbar .toolbar-item .text {
    display: flex;
    line-height: 20px;
    width: max-content;
    vertical-align: middle;
    font-size: 14px;
    color: #777;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 20px;
    text-align: left;
  }

  .toolbar .toolbar-item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 8px;
    line-height: 16px;
    background-size: contain;
  }

  .toolbar i.chevron-down {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    display: flex;
    user-select: none;
  }

  .toolbar i.chevron-down.inside {
    width: 16px;
    height: 16px;
    display: flex;
    margin-left: -25px;
    margin-top: 11px;
    margin-right: 10px;
    pointer-events: none;
  }

  i.chevron-down {
    background-color: transparent;
    background-size: contain;
    display: inline-block;
    height: 8px;
    width: 8px;
    background-image: url(images/icons/chevron-down.svg);
  }

  #block-controls button:active {
    background-color: #efefef;
  }

  #block-controls button:focus-visible {
    border-color: blue;
  }

  #block-controls span.block-type {
    background-size: contain;
    display: block;
    width: 18px;
    height: 18px;
    margin: 2px;
  }

  #block-controls span.block-type.paragraph {
    background-image: url(images/icons/text-paragraph.svg);
  }

  #block-controls span.block-type.h1 {
    background-image: url(images/icons/type-h1.svg);
  }

  #block-controls span.block-type.h2 {
    background-image: url(images/icons/type-h2.svg);
  }

  #block-controls span.block-type.quote {
    background-image: url(images/icons/chat-square-quote.svg);
  }

  #block-controls span.block-type.ul {
    background-image: url(images/icons/list-ul.svg);
  }

  #block-controls span.block-type.ol {
    background-image: url(images/icons/list-ol.svg);
  }

  #block-controls span.block-type.code {
    background-image: url(images/icons/code.svg);
  }

  .dropdown {
    z-index: 5;
    display: block;
    position: absolute;
    box-shadow:
      0 12px 28px 0 rgba(0, 0, 0, 0.2),
      0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    min-width: 100px;
    min-height: 40px;
    background-color: #fff;
  }

  .dropdown .item {
    margin: 0 8px 0 8px;
    padding: 8px;
    color: #050505;
    cursor: pointer;
    line-height: 16px;
    font-size: 15px;
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    border: 0;
    min-width: 268px;
  }

  .dropdown .item .active {
    display: flex;
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  .dropdown .item:first-of-type {
    margin-top: 8px;
  }

  .dropdown .item:last-of-type {
    margin-bottom: 8px;
  }

  .dropdown .item:active {
    background-color: #eee;
  }

  .dropdown .item .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    width: 200px;
  }

  .dropdown .item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 12px;
    line-height: 16px;
    background-size: contain;
  }

  .link-editor {
    position: absolute;
    z-index: 100;
    top: -10000px;
    left: -10000px;
    margin-top: -6px;
    max-width: 300px;
    width: 100%;
    opacity: 0;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    transition: opacity 0.5s;
  }

  .link-editor .link-input {
    display: block;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-editor div.link-edit {
    background-image: url(images/icons/pencil-fill.svg);
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor .link-input a {
    color: rgb(33, 111, 219);
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 30px;
    text-overflow: ellipsis;
  }

  .link-editor .link-input a:active {
    text-decoration: underline;
  }

  .link-editor .button {
    width: 20px;
    height: 20px;
    display: inline-block;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 2px;
  }

  .link-editor .button.activeed {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #eee;
  }

  .link-editor .button .format,
  .actions .format {
    background-size: contain;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: -0.25em;
  }
`;

export default global;
