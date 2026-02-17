type LexicalLikeNode = {
  text?: string;
  children?: LexicalLikeNode[];
};

type LexicalLikeState = {
  root?: {
    children?: LexicalLikeNode[];
  };
};

function parseLexicalState(content: string): LexicalLikeState | null {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;

    return parsed as LexicalLikeState;
  } catch {
    return null;
  }
}

export function isLexicalContent(content: unknown): content is string {
  if (typeof content !== 'string') return false;

  const parsed = parseLexicalState(content);
  return Array.isArray(parsed?.root?.children);
}

export function isLexicalContentEmpty(content: string): boolean {
  const parsed = parseLexicalState(content);
  return !parsed?.root?.children?.[0]?.children?.length;
}

export function extractTextFromLexical(state: string, baseText: string): string {
  try {
    const parsed = JSON.parse(state) as unknown;

    if (typeof parsed === 'string') {
      return parsed;
    }

    const lexicalState = parsed as LexicalLikeState;

    if (lexicalState?.root) {
      const texts: string[] = [];

      const collectTexts = (node: LexicalLikeNode) => {
        if (node.text) {
          texts.push(node.text);
        }

        if (node.children) {
          node.children.forEach(collectTexts);
        }
      };

      collectTexts(lexicalState.root);
      return texts.join('\n');
    }

    return baseText;
  } catch {
    return state;
  }
}
