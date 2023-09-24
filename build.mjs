import esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  jsxFactory: 'h',
  minify: true,
  outdir: './dist',
  outExtension: { '.js': '.mjs' },
  sourcemap: true,
  treeShaking: true,
  platform: 'node',
})
