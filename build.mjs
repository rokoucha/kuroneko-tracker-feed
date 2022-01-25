import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  minify: true,
  outdir: './dist',
  outExtension: { '.js': '.mjs' },
  plugins: [pnpPlugin()],
  sourcemap: true,
})
