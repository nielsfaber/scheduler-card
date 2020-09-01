import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve(),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
  }),
  commonjs({
    include: 'node_modules/zod/**'
  }),
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
  },
];