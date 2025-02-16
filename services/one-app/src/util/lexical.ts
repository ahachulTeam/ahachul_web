import { LexicalNode } from 'lexical';

export function isLexicalContent(content: unknown): content is LexicalNode {
  if (typeof content !== 'string') return false;

  try {
    const parsed = JSON.parse(content);

    if (!parsed || typeof parsed !== 'object') return false;

    const { root } = parsed;

    if (!root || typeof root !== 'object') return false;

    const { children } = root;

    if (!children || !Array.isArray(children)) return false;

    return true;
  } catch {
    return false;
  }
}

type LexicalTextNode = {
  text?: string;
  children?: LexicalTextNode[];
  [key: string]: any;
};

export const extractTextFromLexical = (state: string, baseText: string): string => {
  try {
    const parsedData = JSON.parse(state);

    if (typeof parsedData === 'string') {
      return parsedData;
    }

    // Lexical 상태인 경우
    if (parsedData?.root) {
      const texts: string[] = [];

      const getTexts = (node: LexicalTextNode) => {
        if (node.text) {
          texts.push(node.text);
        }

        if (node.children) {
          node.children.forEach(getTexts);
        }
      };

      getTexts(parsedData.root);
      return texts.join('\n');
    }

    return baseText;
  } catch (error) {
    if (typeof state === 'string') {
      return state;
    }

    console.error('Error extracting text from state:', error);
    return baseText;
  }
};
