type ContentType = 'string' | 'json';

export function checkContentType(content: string): ContentType {
  try {
    const parsed = JSON.parse(content);

    // JSON 파싱은 성공했지만, 우리가 예상하는 lexical 구조인지 확인
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'root' in parsed &&
      typeof parsed.root === 'object' &&
      'children' in parsed.root &&
      Array.isArray(parsed.root.children)
    ) {
      return 'json';
    } else {
      // JSON으로 파싱은 되지만 예상하는 구조가 아닌 경우
      return 'string';
    }
  } catch (error) {
    // JSON 파싱에 실패한 경우
    return 'string';
  }
}
