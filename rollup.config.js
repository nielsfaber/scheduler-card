import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import css from "rollup-plugin-import-css";

const plugins = [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  }),
  css(),
  terser()
];

export default [
  {
    input: 'src/scheduler-card.ts',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: false
    },
    plugins: [...plugins],
    context: 'window'
  },
];