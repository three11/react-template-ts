<div align="center"><img src="https://raw.githubusercontent.com/three11/react-template-ts/master/readme.svg" alt="Zero config and fast installation: Run `npx create-react-app-ts && yarn && yarn start` in your terminal."></div>
<br><br>

[![GitHub issues](https://img.shields.io/github/issues/three11/react-template-ts.svg)](https://github.com/three11/react-template-ts/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/three11/react-template-ts.svg)](https://github.com/three11/react-template-ts/commits/master)
[![Build Status](https://travis-ci.org/three11/react-template-ts.svg?branch=master)](https://travis-ci.org/three11/react-template-ts)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/three11/react-template-ts/README.md)](https://github.com/three11/react-template-ts)

# Create Awesome React Application

> Opinionated React starter template using TypeScript, Redux, React Router, Redux Saga, SCSS, PostCSS and more, offering PWA and offline capabilities and many more.

## Dependencies

In order to use this setup you need to have installed the following dependencies:

1.  Node - min v8.15.0
2.  NPM - min v5.6.0
    or
3.  Yarn - min v1.3.2
4.  Bash terminal (Default on OSX/Linux, GitBash or similar on Windows)

## One line zero config installation

```sh
npx create-react-app-ts && yarn && yarn start
```

## Download

You can download this setup [directly](https://github.com/three11/react-template-ts/archive/master.zip) and extract it.

Then navigate to the `react-template-ts` folder and proceed with the rest of the instructions.

## Install

```sh
yarn

# or

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

## Lint

```sh
yarn lint

# or

npm run lint
```

## Test

```sh
yarn test

# or

npm run test
```

## Details

1.  Folder structure:

    -   `assets/` - all fonts, images, videos, translation files, etc.
    -   `i18n` - configuration settings for i18n (internationalization).
    -   `components/` - stateless components.
    -   `containers/` - statefull components. Each container can export more than one component. An example folder structure is included in (`src/containers/.boilerplate`).
        -   `enums.ts` - each container has its own enums
        -   `interfaces.ts` - each container has its own interfaces
        -   `reducer.ts` - the container reducer
        -   `sagas.ts` - the container sagas
    -   `utilities/` - helpers and utility functions
    -   `app.scss` - Application's global SCSS entry point
    -   `settings.scss` - Application's SCSS settings (variables, mixins, etc)
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
5.  Lint your files: ESLint (with TypeScript ESLint installed and configured) and Stylelint included
6.  Tests using Jest and Enzyme. The Test environment has been configured so you don't have to
7.  Offline first - using Offline Plugin to cache important files and assets
8.  PWA ready - Install as a native app on Android and iOS
9.  Code splitting and lazy loading
10. i18n included:
    1.  add your locales in `/src/i18n/locales`
    2.  add your po files which are based on the `translations.pot` file located in `/src/assets/locale`
    3.  run `yarn locale` to generate `${locale}.json` file from your `${locale}.po` file.
    4.  update your UI to reflect the newly added locale
11. Prerendering - All pages are prerendered based on defined routes. This is included in the build step and needs **no additional configuration**.

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

## Bonus

The start template contains a ready-to-use auth flow with Login, Logout, Sign up and Forgotten password forms with validation included. The auth flow includes also route guarding and redirects based on auth status. Please take a look at the `/src/containers/auth` folder for more details.

The starting files also include ready-to-use layout components such as `Header`, `Footer`, `Wrapper`, `Button`, `Icon` and form `Field`s.

## LICENSE

MIT
