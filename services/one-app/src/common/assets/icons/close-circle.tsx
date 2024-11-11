import * as React from 'react';

function CloseCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" fill="#DFDFDF" />
      <path d="M5.5 5.5L10.5 10.5" stroke="white" strokeLinecap="round" />
      <path d="M5.5 10.5L10.5 5.5" stroke="white" strokeLinecap="round" />
    </svg>
  );
}

export default CloseCircleIcon;
