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
  minWidth: 'max-content',
  maxWidth: '17.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(91deg, rgba(35, 40, 52, 0.87) 0%, rgba(39, 40, 62, 0.87) 100%)',
  padding: '0.5rem 2.25rem',
  textAlign: 'center',
  fontSize: '0.75rem',
  color: 'rgb(196, 212, 252, 0.87)',
  borderRadius: '10px',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
