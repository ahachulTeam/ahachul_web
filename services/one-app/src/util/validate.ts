interface LexicalNode {
  root: {
    children: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

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
