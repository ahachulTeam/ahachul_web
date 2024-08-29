type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

export const getObjectKeys = <Type extends Record<PropertyKey, unknown>>(obj: Type): Array<ObjectKeys<Type>> => {
  if (typeof obj !== 'object') throw new Error('객체가 아닙니다.');

  return Object.keys(obj) as Array<ObjectKeys<Type>>;
};
