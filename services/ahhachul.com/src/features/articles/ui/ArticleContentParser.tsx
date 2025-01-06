import React from 'react';
import Editor from 'shared/ui/Editor';
import * as styles from './ArticleContentParser.css';
import { Interpolation, Theme } from '@emotion/react';

export type ArticleContentParserProps = {
  content: string;
  isPlainContent?: boolean;
  overrideCss?: Interpolation<Theme>;
};

export const ArticleContentParser = ({
  content,
  isPlainContent,
  overrideCss,
}: ArticleContentParserProps) => {
  return (
    <div css={[styles.wrap, overrideCss]}>
      {/* todo: Rich Editor와 분리된 Plain Editor 만들기 */}
      {!isPlainContent && <Editor readonly initialState={content} />}
      {isPlainContent && (
        <pre css={styles.pre} className="editor-input">
          {content.replaceAll(`  `, '\n')}
        </pre>
      )}
    </div>
  );
};
