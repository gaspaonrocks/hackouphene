'use strict';

import angular from 'angular';

import mainComponent from './main/main';
import playerctrlComponent from './main/playerctrl';
import sidenavComponent from './main/sidenav';
import homeComponent from './home/home';
import usersComponent from './users/users';
import playlistsComponent from './playlists/playlists';
import loginComponent from './login/login';
import signinComponent from './login/signin';
import signupComponent from './login/signup';

let components = angular.module('appComponents', []);

components
  .component('main', mainComponent)
  .component('playerctrl', playerctrlComponent)
  .component('sidenav', sidenavComponent)
  .component('home', homeComponent)
  .component('users', usersComponent)
  .component('login', loginComponent)
  .component('signin', signinComponent)
  .component('signup', signupComponent)
  .component('playlists', playlistsComponent);

export default components.name;