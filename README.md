# React Mapbox Template
Easily create a Mapbox App using this React/Mapbox template app! This template serves as a starting point for any React/Mapbox app. This template uses create-react-app and react-mapbox-gl.

## Features

- Create and view map markers using react-mapbox-gl and the Mapbox API
- Location search to quickly navigate anywhere on the map
- Lat/long autopopulation when adding markers
- Mobile reponsiveness
- Built-in load testing

## Tech

React-mapbox-template uses a number of open source projects to work properly:

- [Create React App](https://www.npmjs.com/package/create-react-app) - Set up a modern web app by running one command.
- [React Mapbox Gl](https://www.npmjs.com/package/react-mapbox-gl) - React wrapper for mapbox-gl-js
- [Sass](https://www.npmjs.com/package/sass) - A pure JavaScript implementation of Sass. Sass makes CSS fun again.
- [Mapbox](https://docs.mapbox.com/) - Examples, tutorials, and API references to help you start building with Mapbox.

## Installation

React-mapbox-template requires a [Mapbox](https://www.mapbox.com/) account to run. Simply sign up for free and create an access token.

Set up .env file

```sh
cd react-mapbox-template
touch .env
nano .env
REACT_APP_MAPBOX_ACCESS_TOKEN=[YOUR_ACCESS_TOKEN]
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

Feel free to connect to whatever API server you like for real data! Please see the "src/utils/api.js" file for an example marker data structure. All contibrutions are welcome! I hope you enjoy!
