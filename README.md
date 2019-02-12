![banner](./server/assets/reacoa-banner.png)

# Reacoa

Reacoa is a turnkey solution that integrates webpack, react, http-server and electron.
> Enjoying it :)

## Quick Start

```
$ npm run init
$ npm start
```

## Scripts

| Path    | Script      | Description                                                  |
| ------- | ----------- | ------------------------------------------------------------ |
| /       | init        | Install dependence and build front-end files.                                         |
| /       | start       | Run electron.                                                |
| /       | build-front | Build front-end code. Saved in `/front/build` & `/server/front.` |
| /       | build-win   | Build Electron app for windows platform.                     |
| /       | build-linux | Build Electron app for linux platform.                       |
| /       | build-mac   | Build Electron app for mac platform.                         |
| /front  | start       | Develop front-end code.                                      |
| /front  | build       | Build front-end code. Saved in `/front/build` & `/server/front.` |
| /front  | test        | Run tests.                                                   |
| /server | start       | Start http-server by `/server/index.js`                                       |

## Directory Structure

```
|-- projects
    |-- README.md
    |-- index.js
    |-- package.json
    |-- reacoa.lock.md # reacoa lock file
    |-- front # front-end project
    |   |-- package.json
    |   |-- build # built files
    |   |-- config # dev configs
    |   |-- public # html frame
    |   |-- scripts # npm scripts
    |   |-- src # source dir
    |       |-- App.jsx # react root node
    |       |-- App.test.js
    |       |-- index.js # entrance
    |       |-- index.less # global/basic styles
    |       |-- serviceWorker.js
    |       |-- component
    |       |   |-- lib # predefined components by reacoa
    |       |       |-- Example # reacoa default home page
    |       |       |-- Template # used for replication usually
    |       |       |-- Test
    |       |       |-- ThrowError # throw a error for error catching test
    |       |       |-- WithErrorBoundary # decorator for error catching
    |       |-- model # mobx models
    |       |   |-- example.js
    |       |   |-- index.js
    |       |-- page
    |       |   |-- 404.jsx
    |       |   |-- index.jsx
    |       |   |-- test.jsx
    |       |-- util
    |           |-- example.js
    |-- server # back-end project(optional)
        |-- app.js # server
        |-- electron.js # electron app's entrance
        |-- index.js # start server
        |-- package.json
        |-- router.js # router defines
        |-- front # front-end files(generated by front-end project automatically)
        |-- assets # static resources for electron
        |   |-- favicon.ico
        |   |-- favicon.png
        |-- config
            |-- electron.js # electron build configs

```

## Basic Configs

### Version Control

Set your own version control information in `/package.json`.

### Icon  & Title

Set icon and title in `/front/public`.

If you are using Electron, icon also need to be set in `/server/assets` .

If you are using Electron, change app title in `/package.json`.

```
"build-win": "electron-packager ./server reacoa --platform=win32 --arch=x64 --out ./electron --app-version 0.1.0 --overwrite --icon=./front/public/favicon.ico --asar",
    "build-linux": "electron-packager ./server reacoa --platform=linux --arch=x64 --out ./electron --app-version 0.1.0 --overwrite --icon=./front/public/favicon.ico --asar",
    "build-mac": "electron-packager ./server reacoa --platform=darwin --arch=x64 --out ../electron --app-version 0.1.0 --overwrite --icon=./front/public/favicon.ico --asar"
```

> Replace "reacoa" with "YOUR APP NAME".
>
> Icon format `.ico` is not supported in some linux system, try format `.png` instead.

## Release

### [0.1.2](https://github.com/yuri2peter/reacoa/tree/0.1.2)

- better `README.md`
- use 'npm ci' to install dependence
