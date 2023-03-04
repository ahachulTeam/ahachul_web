import { useSample } from '@/hooks';

interface Props {
  someProp: string;
}

export default function SomeComponent({ someProp }: Props) {
  const { sample } = useSample();

  return <div>{someProp}</div>;
}
