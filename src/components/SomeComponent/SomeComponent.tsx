'use client';

import { useSample } from '@/hooks';

import * as S from './styled';

interface Props {
  someProp: string;
}

export default function SomeComponent({ someProp }: Props) {
  const { sample } = useSample();

  return (
    <S.Paragraph>
      <span>{someProp}</span>
      <span>{sample}</span>
    </S.Paragraph>
  );
}
