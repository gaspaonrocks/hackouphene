'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import messages from 'angular-messages';
import material from 'angular-material';
import css from 'angular-css';
import youtube from 'angular-youtube-embed';

import 'angular-material/angular-material.css';
import 'mdi/css/materialdesignicons.css';
import '../css/index.scss';

import components from './components';
import services from './services';
import config from './config';

let app = angular.module('youtubeApp', [
  uiRouter,
  material,
  messages,
  css,
  youtube,
  components,
  services
]);

app.constant('CONSTANTS', config.constants);
app.config(config.storage);
app.config(config.routes);
app.config(config.icons);
app.run(config.run);

export default app;