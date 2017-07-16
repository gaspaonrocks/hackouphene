'use strict';

import template from './playerctrl.html';

export default {

  template: template,

  controller: function ($scope, $rootScope, $log, SongsService, $mdSidenav) {
    'ngInject';

    this.$onInit = () => {
      this.currentSong = {};
    };

    this.$onChanges = function (changes) {
      // finalement pas sûr que $onchanges soit vraiment utile...
      // le passage d'une donnée d'un parent à l'enfant 
      // se fait par les écoutes...
      // this.currentSong = changes;
    };

    $rootScope.$on('currentSong', (evt, obj) => {
      this.currentSong = obj;
    });

    this.toggleRight = buildToggler('right');
    this.isOpenRight = () => {
      return $mdSidenav('right').isOpen();
    };

    this.prevSong = () => {
      $rootScope.$emit('prevSong');
    }

    this.nextSong = () => {
      $rootScope.$emit('nextSong');
    }

    function buildToggler(navID) {
      return () => {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(() => {
            $log.debug('toggle ' + navID + ' is done');
          });
      };
    }
  }
}