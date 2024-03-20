import { vars } from '@ahhachul/themes';

const GUTTER = '20px';

const HEADER_HEIGHT = '58px';
const NAVBAR_HEIGHT = '64px';

const theme = {
  color: {
    static: {
      light: Object.entries(vars.colors.$static.light).reduce(
        (acc, [key, value]) => {
          const color = Object.entries(value).reduce((acc, [key, value]) => {
            return {
              ...acc,
              [key]: value,
            };
          }, {});

          return {
            ...acc,
            [key]: color,
          };
        },
        {} as {
          [key in keyof (typeof vars)['colors']['$static']['light']]: (typeof vars)['colors']['$static']['light'][key];
        },
      ),
      dark: Object.entries(vars.colors.$static.dark).reduce(
        (acc, [key, value]) => {
          const color = Object.entries(value).reduce((acc, [key, value]) => {
            return {
              ...acc,
              [key]: value,
            };
          }, {});

          return {
            ...acc,
            [key]: color,
          };
        },
        {} as {
          [key in keyof (typeof vars)['colors']['$static']['dark']]: (typeof vars)['colors']['$static']['dark'][key];
        },
      ),
    },
    scale: Object.entries(vars.colors.$scale).reduce(
      (acc, [key, value]) => {
        const color = Object.entries(value).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value,
          };
        }, {});

        return {
          ...acc,
          [key]: color,
        };
      },
      {} as {
        [key in keyof (typeof vars)['colors']['$scale']]: (typeof vars)['colors']['$scale'][key];
      },
    ),
  },
  typography: Object.entries(vars.typography).reduce(
    (acc, [key, value]) => {
      const typography = Object.entries(value).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {});

      return {
        ...acc,
        [key]: typography,
      };
    },
    {} as {
      [key in keyof (typeof vars)['typography']]: (typeof vars)['typography'][key];
    },
  ),
  layout: {
    ...Object.entries(vars.box).reduce(
      (acc, [key, value]) => {
        const layout = Object.entries(value).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value,
          };
        }, {});

        return {
          ...acc,
          [key]: layout,
        };
      },
      {} as {
        [key in keyof (typeof vars)['box']]: (typeof vars)['box'][key];
      },
    ),
    dimensions: Object.entries(vars.zIndex).reduce(
      (acc, [key, value]) => {
        const zIndex = Object.entries(value).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value,
          };
        }, {});

        return {
          ...acc,
          [key]: zIndex,
        };
      },
      {} as {
        [key in keyof (typeof vars)['zIndex']]: (typeof vars)['zIndex'][key];
      },
    ),
    size: {
      gutter: GUTTER,
      height: {
        header: HEADER_HEIGHT,
        navbar: NAVBAR_HEIGHT,
      },
    },
  },
} as const;

export default theme;
