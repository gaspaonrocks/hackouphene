'use strict';

import template from './home.html';
import dialog from './dialogCtrl';

export default {

  template: template,

  controller: function (YoutubeService, $log, $scope, $rootScope, $mdDialog) {
    'ngInject';

    this.$onInit = () => {
      $log.log('ready to fire !');
    };

    this.searchYoutube = (param) => {
      // why can't i just get the param straight from the ng-model ???
      let query = {
        field: param
      };
      this.results = [];
      // why do I have to JSON.stringify it ???
      YoutubeService.searchVideos(JSON.stringify(query)).then((data) => {
        this.results = data.items;
        console.log(this.results);
      })
    }

    this.clearSearch = () => {
      this.results = [];
    }

    this.keepSong = (obj) => {
      this.song = obj;
      console.log(this.song);
    }

    this.showAdvanced = (ev, obj) => {
      $mdDialog.show(dialog({
        song: obj
      }));
    };
  }
}