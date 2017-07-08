'use strict';

import angular from 'angular';
import resource from 'angular-resource';
import localStorage from 'angular-local-storage';

import usersService from './users';
import authService from './auth';
import youtubeService from './youtube';
import playlistsService from './playlists';

let services = angular.module('appServices', [
  localStorage,
  resource
]);

services
  .factory('UsersService', usersService)
  .service('YoutubeService', youtubeService)
  .factory('PlaylistsService', playlistsService)
  .service('AuthService', authService);

export default services.name;