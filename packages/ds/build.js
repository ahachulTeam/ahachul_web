import run from '@ahhachul/esbuild-config'
import pkg from './package.json' assert { type: 'json' }

run({
  pkg,
})
