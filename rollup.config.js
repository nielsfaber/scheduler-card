import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import { visualizer } from 'rollup-plugin-visualizer';


const plugins = [
  alias({
    entries: [
      { find: 'lit/decorators', replacement: 'lit/decorators.js' },
      { find: 'lit/directives/style-map', replacement: 'lit/directives/style-map.js' },
      { find: 'lit/directives/unsafe-html', replacement: 'lit/directives/unsafe-html.js' },
    ]
  }),
  nodeResolve({
    exportConditions: ['production', 'default'],
    extensions: ['.js', '.ts'],
    preferBuiltins: false,
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  typescript(),
  json(),
  visualizer(),
  terser(),
];

export default [
  {
    input: 'src/scheduler-card.ts',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: false,
      name: 'SchedulerCard',
    },
    plugins: [...plugins],
    context: 'window',
  },
];
