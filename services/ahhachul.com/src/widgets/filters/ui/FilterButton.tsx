import React from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';

import * as styles from './Filter.css';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => (
  <button data-active={isActive} css={styles.buttonFilter} onClick={onClick}>
    <span>{label}</span>
    <ChevronDownIcon className="arrow-down-img" stroke={isActive ? '#fff' : '#4C5874'} />
  </button>
);
