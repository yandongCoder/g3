import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
    banner: "//g3",
    entry: './index.js',
    dest: './dist/js/g3.js',
    format: 'umd',
    plugins: [ json(), babel() ]
}; 