# leofcoin-paper-wallet
> Leofcoin Paper Wallet Generator

## BROWSER SUPPORT
- [x] Google Chrome
- [x] Mozilla Firefox (58)*
- [ ] Microsoft Edge (generating wallet works, downloading doesn't)

****Firefox has a [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1409992) wich prevent 
the qrcode to work as expected, this will be fixed in FF 58.***
## Install
Asuming you already have node and npm installed install live-server with
```sh
# NPM
npm install live-server --global

# Yarn
yarn global add live-server
```

## Development
### Build
```sh
npm run compile
```
### watch 
```sh
npm run watch
```
### Serve
```sh
npm run start
```
## ROADMAP
- [x] Support Leofcoin
- [ ] Support Bitcoin
- [ ] Support Litecoin
- [ ] Support other currencies (currency will be added when requested)

## License
CC-BY-NC-ND-4.0 © [Glenn Vandeuren](https://github.com/VandeurenGlenn)
