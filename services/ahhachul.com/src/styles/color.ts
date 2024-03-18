import { vars } from '@ahhachul/themes';

const color = {
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
        [key in keyof (typeof vars)['colors']['$static']['light']]: string;
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
        [key in keyof (typeof vars)['colors']['$static']['dark']]: string;
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
      [key in keyof (typeof vars)['colors']['$scale']]: string;
    },
  ),
};

export { color };
