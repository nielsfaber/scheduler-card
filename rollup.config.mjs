import { getBabelInputPlugin, getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const basePlugins = [
  typescript({
    declaration: false,
  }),
  nodeResolve(),
  json(),
  commonjs(),
  getBabelInputPlugin({
    babelHelpers: 'bundled',
  }),
  getBabelOutputPlugin({
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: { esmodules: true },
        },
      ],
    ],
    compact: !dev,
  }),
];

export default async () => {
  const plugins = dev
    ? [...basePlugins, serve(serveOptions)]
    : [
        ...basePlugins,
        terser(),
        (await import('rollup-plugin-visualizer')).visualizer({
          filename: 'stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
      ];

  return [
    {
      input: 'src/scheduler-card.ts',
      output: {
        dir: 'dist',
        format: 'es',
        inlineDynamicImports: true,
        sourcemap: dev ? 'inline' : false,
      },
      plugins,
      moduleContext: (id) => {
        const thisAsWindowForModules = [
          'node_modules/@formatjs/intl-utils/lib/src/diff.js',
          'node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js',
        ];
        if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
          return 'window';
        }
      },
    },
  ];
};
