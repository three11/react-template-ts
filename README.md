[![GitHub issues](https://img.shields.io/github/issues/three11/react-template-ts.svg)](https://github.com/three11/react-template-ts/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/three11/react-template-ts.svg)](https://github.com/three11/react-template-ts/commits/master)
[![Build Status](https://travis-ci.org/three11/react-template-ts.svg?branch=master)](https://travis-ci.org/three11/react-template-ts)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/three11/react-template-ts/README.md)](https://github.com/three11/react-template-ts)

# React Template

Opinionated React starter template using TypeScript, Redux, React Router, Redux Saga, SCSS, PostCSS and more, offering PWA and offline capabilities and many more.

## Dependencies

In order to use this setup you need to have installed the following dependencies:

1.  Node - min v8.15.0
2.  NPM - min v5.6.0
    or
3.  Yarn - min v1.3.2
4.  Bash terminal (Default on OSX/Linux, GitBash or similar on Windows)

## Download

You can download this setup [directly](https://github.com/three11/react-template/archive/master.zip) and extract it.

Then navigate to the `react-template` folder and proceed with the rest of the instructions.

## Install

```sh
yarn

#or

npm i
```

## Develop

```sh
yarn start

# or

npm start
```

## Build

```sh
yarn build

# or

npm run build
```

## Details

### JS

1.  Folder structure:

    -   `assets/` - all fonts, images, videos, etc.
    -   `components/` - stateless components.
    -   `containers/` - statefull components.
    -   `utilities/` - helpers and utility functions
    -   `app.scss` - Application's global SCSS entry point
    -   `app.tsx` - Application's main component
    -   `custom.d.ts` - Custom type definitions
    -   `index.html` - Application's HTML file
    -   `index.tsx` - The main entry point
    -   `loadables.tsx` - Code split and lazy loaded components
    -   `reducers.js` - Application's root reducer
    -   `sagas.js` - Application's sagas
    -   `store.js` - Application's Redux store

2.  Latest EcmaScript support

    -   Usage of the latest features in EcmaScript
    -   Using [TypeScript](https://www.typescriptlang.org/) to transpile to ES5
    -   Minification of the bundled file
    -   Source maps

3.  Webpack aliases: Checkout the aliases property in the `webpack.config.ts` file.
4.  SCSS usage.
5.  Lint your files: ESLint and Stylelint included
6.  Tests using Jest. The Test environment has been configured so you don't have to
7.  Offline first - using Offline Plugin to cache important files and assets
8.  PWA ready - Install as a native app on Android and iOS
9.  Code splitting and lazy loading

## Supported Browsers

This setup uses [Browserslist](https://github.com/browserslist/browserslist) to target browsers.

The default list of supported browsers is listed in the `package.json` file:

```json
{
	"browserslist": ["> 1%", "last 2 versions"]
}
```

This means that supported browsers vary based on current usage data and current browser versions.

In general, this setup supports the two most recent versions of all browsers.

## LICENSE

MIT
