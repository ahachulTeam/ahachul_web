import { useMemo } from 'react';

interface TrainSvgProps {
  width?: number;
}

function TrainSvg({ width = 295 }: TrainSvgProps) {
  const d = useMemo(
    () =>
      `M5.27831 7.78309C6.31333 3.23054 10.3608 0 15.0295 0H293C294.105 0 ${width} 0.895431 ${width} 2V29C295 30.1046 294.105 31 293 31H3.7586C1.83335 31 0.406436 29.2123 0.833246 27.3349L5.27831 7.78309Z`,
    [width],
  );

  return (
    <svg width={width} height="31" viewBox={`0 0 ${width} 31`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} fill="#E9E9E9" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 22L5.39623 7H12C13.1046 7 14 7.89543 14 9V20C14 21.1046 13.1046 22 12 22H2Z"
        fill="#ADADAD"
      />
    </svg>
  );
}

export default TrainSvg;
