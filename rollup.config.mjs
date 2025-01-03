import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: './src/MyComponent.js',
  output: {
    file: './dist/my-component.js',
    format: 'esm',
  },
  plugins: [terser()],
});
