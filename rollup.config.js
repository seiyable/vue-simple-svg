import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
// import nodeResolve  from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/plugin.js',
  output: {
    file: 'dist/plugin.js',
    format: 'cjs'
  },
  external: ['css'],
  plugins: [
    // nodeResolve({
    //   module: false
    // }),
    // commonjs(),
    babel({
      babelrc: false,
      presets: ["es2015-rollup"]
    }),
    uglify()
  ]
};
