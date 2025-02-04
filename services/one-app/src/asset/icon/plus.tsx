import * as React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

function PlusIcon({ width = 24, height = 24, ...rest }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest} // 여기서 나머지 props를 전파합니다.
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

export default PlusIcon;
