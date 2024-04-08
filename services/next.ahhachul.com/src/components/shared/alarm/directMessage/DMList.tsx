import { CSSObject, Theme } from '@emotion/react';
import { useState } from 'react';
import { f } from '@/src/styles';
import OneOnOne from './OneOnOne';
import Group from './Group';

function DMList() {
  const [DMTab, setDMTab] = useState('oneOnOne');

  return (
    <div>
      <div css={buttonGroup}>
        <button css={toggleBtn(DMTab === 'oneOnOne')} onClick={() => setDMTab('oneOnOne')}>
          개인
        </button>
        <button css={toggleBtn(DMTab === 'group')} onClick={() => setDMTab('group')}>
          그룹
        </button>
      </div>
      {DMTab === 'oneOnOne' && (
        <ul>
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
          <OneOnOne />
        </ul>
      )}
      {DMTab === 'group' && (
        <ul>
          <Group />
          <Group />
        </ul>
      )}
    </div>
  );
}

const buttonGroup: [CSSObject[], CSSObject] = [
  f.flexAlignCenter,
  {
    margin: '0 20px 20px',
  },
];

const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    flexShrink: 0,
    border: '1px solid rgb(196, 212, 252, 0.37)',
    height: '32px',
    borderRadius: '124px',
    padding: '0 14px',
    fontSize: fontSize[14],
    width: 'max-content',
    marginRight: '8px',
    background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
    color: isActive ? '#141517' : '#9da5b6',
    fontWeight: isActive ? fontWeight[600] : fontWeight[400],
  });

export default DMList;
