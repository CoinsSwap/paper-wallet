import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
export default [{
  input: 'src/index.js',
  output: {
  	experimentalCodeSplitting: true,
    treeshake: true,
    file: 'lib/wallet.js',
    format: 'es'
  },
  plugins: [
    commonjs()
    // terser()
  ]
}]
