import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import cp from 'cp';
import del from 'del';

del.sync('lib/chunk-*');

cp.sync('node_modules/particles.js/particles.js', 'lib/particles.js');
cp.sync('node_modules/qrcode/build/qrcode.js', 'lib/qrcode.js');
cp.sync('node_modules/file-saver/FileSaver.js', 'lib/FileSaver.js');
cp.sync('node_modules/dom-to-image/src/dom-to-image.js', 'lib/dom-to-image.js')
export default [{
  input: 'src/wallet.js',
  output: {
  	experimentalCodeSplitting: true,
    treeshake: true,
    dir: 'lib',
    format: 'es'
  },
  plugins: [
    commonjs(),
    terser()
  ]
}]
