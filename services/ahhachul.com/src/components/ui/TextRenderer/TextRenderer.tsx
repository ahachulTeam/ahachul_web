import React from 'react';
import { css } from '@emotion/react';
import { UiComponent } from 'components';

export type AwesomeRendererProps = {
  article: string;
  isPlainText?: boolean;
};

function TextRenderer({ article, isPlainText }: AwesomeRendererProps) {
  return (
    <div css={wrapperStyle}>
      {!isPlainText && <UiComponent.Editor readonly initialState={article} />}
      {isPlainText && (
        <pre
          className="editor-input"
          css={{ lineHeight: '32px', padding: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {article.replaceAll(`  `, '\n')}
        </pre>
      )}
    </div>
  );
}

const wrapperStyle = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

export default TextRenderer;
