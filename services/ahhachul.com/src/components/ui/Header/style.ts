import { CSSObject, Theme } from '@emotion/react';

const wrapper = ({
  color: {
    scale: { gray },
  },
}: Theme): CSSObject => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  height: '58px',
  background: gray[1000],
  padding: '0 20px',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 1000,
});

const logoSection: CSSObject = {
  display: 'flex',
  alignItems: 'center',
};

export { wrapper, logoSection };
