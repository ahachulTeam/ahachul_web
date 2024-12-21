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

    return (
      parsed !== null &&
      typeof parsed === 'object' &&
      'root' in parsed &&
      typeof parsed.root === 'object' &&
      parsed.root !== null &&
      'children' in parsed.root &&
      Array.isArray(parsed.root.children)
    );
  } catch {
    return false;
  }
}
