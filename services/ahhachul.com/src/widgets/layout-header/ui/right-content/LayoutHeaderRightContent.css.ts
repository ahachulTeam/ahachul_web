export const right = {
  display: 'grid',
  gridTemplateColumns: '36px 36px',
  alignItems: 'center',
  gap: '8px',

  '& > button': {
    width: '36px',
    height: '36px',
  },
};

export const rightJustOne = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '16px',
};
