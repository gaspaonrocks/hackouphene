'use strict';

import angular from 'angular';
import resource from 'angular-resource';
import localStorage from 'angular-local-storage';

import usersService from './users';
import authService from './auth';
import youtubeService from './youtube';

let services = angular.module('appServices', [
  localStorage,
  resource
]);

services
  .factory('UsersService', usersService)
  .service('YoutubeService', youtubeService)
  .service('AuthService', authService);

export default services.name;