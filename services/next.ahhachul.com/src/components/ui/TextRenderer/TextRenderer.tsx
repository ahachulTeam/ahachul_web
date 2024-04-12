import React from 'react';
import { css } from '@emotion/react';
import { UiComponent } from '@/src/components';

// 신촌역(2호선)에서는 [24.04.11]  [연녹색 지갑(샤르트뢰즈(역녹)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음

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
