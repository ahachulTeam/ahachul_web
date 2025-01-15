import { Interpolation, Theme } from '@emotion/react';

export const wrap = ({
  dimensions: {
    size: {
      height: { header },
    },
    zIndexes: { dimmed },
  },
}: Theme) =>
  ({
    position: 'fixed',
    top: header,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: dimmed,
  }) as Interpolation<Theme>;

export const cover =
  (opacity: number, isWhite: boolean) =>
  ({
    color: { text, background },
    dimensions: {
      size: {
        height: { header },
      },
    },
  }: Theme) =>
    ({
      background: isWhite ? text[50] : background[50],
      opacity,
      height: `calc(100vh - ${header})`,
    }) as Interpolation<Theme>;

export const background = ({
  dimensions: {
    size: {
      height: { header },
    },
    zIndexes: { dialog },
  },
}: Theme) =>
  ({
    position: 'fixed',
    left: 0,
    top: header,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    height: `calc(100vh - ${header})`,
    zIndex: dialog,
  }) as Interpolation<Theme>;
