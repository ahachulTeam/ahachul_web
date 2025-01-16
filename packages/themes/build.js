import run from '@ahhachul/esbuild-config';
// eslint-disable-next-line prettier/prettier
import pkg from './package.json' assert { type: 'json' };

run({
  pkg,
});
