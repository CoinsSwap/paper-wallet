import MultiWallet from './../node_modules/multi-wallet/browser.js';
import domtoimage from './../node_modules/dom-to-image/src/dom-to-image.js';
import {saveAs} from './../node_modules/file-saver/FileSaver.js';

const main = document.querySelector('main');

const selectSection = () => {
  Array.from(main.querySelectorAll('section')).forEach(section => {
    if (section.dataset.route === location.hash.replace('#', '')) {
      section.classList.add('selected');
    } else {
      section.classList.remove('selected');
    }
  });
}

window.addEventListener('hashchange', change => selectSection());

if (!location.hash || location.length === 1 || location.hash === '#qr') {
  location.hash = 'home';
} else {
  selectSection(location.hash);
}

const _generateQR = input => QRCode.toDataURL(input, {
  scale: 5,
  margin: 0,
  // color: {
    // dark: '#00ff00ff'
  // },
  rendererOpts: {
    quality: 1
  }
});

const create = async () => {
  const wallet = new MultiWallet('leofcoin:olivia');
  const mnemonic = wallet.generate();
  const codes = [await _generateQR(wallet.account(0).external(0).address), await _generateQR(wallet.export())];
  document.querySelector('.public').innerHTML = wallet.address;
  document.querySelector('.public-qr').src = codes[0];
  // wallet import format;
  document.querySelector('.private').innerHTML = wallet.wif;
  document.querySelector('.private-qr').src = codes[1];

  location.hash = 'qr';
  document.querySelector('.download').addEventListener('click', downloadPaper);
}

/**
 * Download the wallet
 *
 * When on mobile the wallet is not displayed, When clicking the download button
 * The wallet is displayed and an overlay is drawn to hide the wallet.
 */
const downloadPaper = async () => {
  await loadParticles('wallet');
  const wallet = document.querySelector('.wallet');
  const generating = document.querySelector('.generating');
  generating.classList.remove('hidden');
  wallet.classList.remove('hidden');
  const blob = await domtoimage.toBlob(wallet, {bgcolor: '#1c2c3b'});
  wallet.classList.add('hidden');
  generating.classList.add('hidden');
  await saveAs(blob, 'crypto-wallet.png');
  document.querySelector('.download').removeEventListener('click', downloadPaper);
  location.hash = 'home';
}

window.create = create;
