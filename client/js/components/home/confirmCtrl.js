'use strict';

import template from './confirm.tmpl.html';

export default (locals) => ({

  template: template,
  locals,
  bindToController: true,
  controllerAs: '$ctrl',
  controller: function ($mdDialog, $rootScope) {
    this.$onInit = () => {};

    console.log(this.song);

    this.addSong = (obj) => {
      console.log('confirm song', obj);
      $rootScope.$emit('addSong', obj);
      $mdDialog.cancel();
    };

    this.cancel = () => {
      $mdDialog.cancel();
    };
  },
  clickOutsideToClose: true
})