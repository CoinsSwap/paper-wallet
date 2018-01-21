import wallet from 'crypto-io-wallet/wallet.browser';
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';

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
  selectSection(location.hash)
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

const create = () => {
  const _wallet = new wallet.CryptoWallet({});
  _wallet.new();
  const codes = [_generateQR(_wallet.address), _generateQR(_wallet.wif)]

  Promise.all(codes).then(result => {
    // address
    document.querySelector('.public').innerHTML = _wallet.address;
    document.querySelector('.public-qr').src = result[0];
    // wallet import format;
    document.querySelector('.private').innerHTML = _wallet.wif;
    document.querySelector('.private-qr').src = result[1];

    location.hash = 'qr';
    document.querySelector('.download').addEventListener('click', downloadPaper);
  })
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
