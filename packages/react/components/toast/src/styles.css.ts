import { style } from '@vanilla-extract/css';

export const toastContainerStyle = style({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',

  pointerEvents: 'none',

  padding: '0.5rem',
  left: 0,
  bottom: 0,
  zIndex: 99999,
});

export const toastStyle = style({
  width: '100%',
  maxWidth: '17.5rem',
  backgroundColor: "var(--gray-900)",
  padding: "0.5rem 0.75rem",
  color: "var(--gray-50)",
  borderRadius: "var(--radii-md)",
});
