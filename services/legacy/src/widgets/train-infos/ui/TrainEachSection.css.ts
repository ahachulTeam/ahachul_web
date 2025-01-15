import { Interpolation, Theme } from '@emotion/react';

export const eachSection =
  (sectionColor: string) =>
  ({ typography: { fontSize, fontWeight }, color: { text } }: Theme) =>
    ({
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '115%',
      borderRadius: '6px',
      backgroundColor: sectionColor,
      color: text[50],
      boxShadow: '0px 3px 1px 0px #585858',
    }) as Interpolation<Theme>;
