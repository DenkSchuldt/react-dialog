
//"build": "set NODE_ENV=production && rm -rf dist && mkdir dist && npx babel src/ --out-dir dist --copy-files",

import url from '@rollup/plugin-url';
import sass from 'rollup-plugin-sass';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false
    }
  ],
  plugins: [
    sass({ insert: true }),
    url(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            "targets": {
              "node": "current"
            }
          }
        ]
      ],
      exclude: /node_modules/
    }),
    commonjs({
      include: ["./index.js", "node_modules/**"]
    })
  ],
  external: ['react', 'react-dom']
}
