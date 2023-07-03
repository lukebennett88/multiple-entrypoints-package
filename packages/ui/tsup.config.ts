import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts', 'src/*/index.ts'],
	splitting: true,
	clean: !options.watch,
	dts: true,
	format: ['cjs', 'esm'],
}));
