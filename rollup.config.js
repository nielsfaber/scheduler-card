import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 5002,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};


const plugins = [
  alias({
    entries: [
      { find: 'lit/decorators', replacement: 'lit/decorators.js' },
      { find: 'lit/directives/style-map', replacement: 'lit/directives/style-map.js' },
      { find: 'lit/directives/unsafe-html', replacement: 'lit/directives/unsafe-html.js' },
    ],
  }),
  nodeResolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  typescript({
    tsconfig: './tsconfig.json',
    noEmitOnError: false,
    compilerOptions: {
      noEmit: false,
    },
  }),
  json(),
  visualizer(),
  ...(dev ? [serve(serveOptions)] : [terser()]),
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
