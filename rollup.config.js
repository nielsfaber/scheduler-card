import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';


const plugins = [
  nodeResolve(),
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
    },
    plugins: [...plugins],
    context: 'window',
  },
];
