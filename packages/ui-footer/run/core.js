import esbuild from 'esbuild'

const settings = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    target: ['es6'],
    jsx: 'automatic',
    format: 'esm',
    outfile: './dist/ui-footer.min.js',
}

esbuild.build(settings).catch(() => process.exit(1))
