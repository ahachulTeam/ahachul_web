import * as theme from '../dist/index.js';
import fs from 'fs';

const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
};

const generateThemeCssVariables = () => {
  const cssString = [];

  const handleColorVariables = (colorKey, colorValue, selector) => {
    const cssVariables = Object.entries(colorValue)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`)
          .join('\n'),
      )
      .join('\n');

    return cssString.push(`${selector} {\n${cssVariables}\n}`);
  };

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === 'colors') {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === 'light' || colorKey === 'foundation' || colorKey === 'domain') {
          handleColorVariables(colorKey, colorValue, ':root');
        } else if (colorKey === 'dark') {
          handleColorVariables(colorKey, colorValue, ':root .theme-dark');
        }
      });

      return;
    }

    const selector = ':root';
    const cssVariables = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`)
          .join('\n'),
      )
      .join('\n');

    return cssString.push(`${selector} {\n${cssVariables}\n}`);
  });

  return cssString;
};

const generateThemeCssClasses = () => {
  const cssString = [];

  Object.entries(theme.classes).forEach(([, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            const className = `.${toCssCasting(mainKey)}${toCssCasting(subKey)}`;

            const styleProperties = Object.entries(subValue)
              .map(([styleKey, styleValue]) => `${toCssCasting(styleKey)}: ${styleValue};`)
              .join('\n');

            return `${className} {\n${styleProperties}\n}`;
          })
          .join('\n'),
      )
      .join('\n');

    cssString.push(cssClasses);
  });

  return cssString;
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();
  const classes = generateThemeCssClasses();

  fs.writeFileSync('dist/themes.css', [...variables, ...classes].join('\n'));
};

generateThemeCss();
