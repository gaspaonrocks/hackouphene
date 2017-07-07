'use strict';

import template from './dialog.tmpl.html';
import confirm from './confirmCtrl.js';

export default (locals) => ({

  template: template,
  locals,
  bindToController: true,
  controllerAs: '$ctrl',
  controller: function ($mdDialog, $rootScope) {
    console.log(this.song);

    this.addSong = (obj) => {
      obj.url = obj.id.videoId;

      $mdDialog.show(confirm({
        song: obj
      }));
    };

    this.playSong = (obj) => {
      obj.url = obj.id.videoId;
      $rootScope.$emit('playSong', obj);
      // console.log('song played', obj);
    };
    this.cancel = () => {
      $mdDialog.cancel()
    };
  },
  clickOutsideToClose: true
})