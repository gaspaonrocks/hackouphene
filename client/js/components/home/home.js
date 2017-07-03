'use strict';

import template from './home.html';

export default {

  template: template,

  controller: function (YoutubeService, $log, $scope, $rootScope) {
    'ngInject';

    this.$onInit = () => {
      $log.log('ready to fire !');
    };

    this.addSong = (obj) => {
      obj.url = obj.id.videoId;
      $rootScope.$emit('addSong', obj);
    }

    this.playSong = (obj) => {
      obj.url = obj.id.videoId;
      $rootScope.$emit('playSong', obj);
    }

    this.searchYoutube = (param) => {
      let query = {
        field: param
      };
      this.results = [];
      console.log(JSON.stringify(query));
      YoutubeService.searchVideos(JSON.stringify(query)).then((data) => {
        this.results = data.data.items;
      })
    }

    this.keepSong = (obj) => {
      this.song = obj;
      console.log(this.song);
    }
  }
}