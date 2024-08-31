import React from 'react';
import Editor from 'shared/ui/Editor';
import * as styles from './ArticleContentParser.css';

export type ArticleContentParserProps = {
  content: string;
  isPlainContent?: boolean;
};

export const ArticleContentParser = ({
  content,
  isPlainContent,
}: ArticleContentParserProps) => {
  return (
    <div css={styles.wrap}>
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
