'use strict';

import template from './playerctrl.html';

export default {

  template: template,

  controller: function ($scope, $rootScope, $log, SongsService, $mdSidenav) {
    'ngInject';

    this.$onInit = () => {};

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