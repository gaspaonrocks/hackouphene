'use strict';

import template from './sidenav.html';

export default {

  template: template,

  controller: function ($scope, $rootScope, $log, SongsService, $mdSidenav) {
    'ngInject';

    this.$onInit = () => {
      this.urlList = [];
      this.songsList = [];
      this.index = 1;
    }

    this.$onChanges = () => {
      $scope.$on('youtube.player.ready', ($event, player) => {
        console.log('im ready!');
        // play it again
        player.playVideo();
      });

      $scope.$on('youtube.player.ended', ($event, player) => {
        if (this.songsList.length > 0) {
          this.songUrl = this.songsList[this.index].url;
          this.index == this.songsList.length - 1 ? this.index = 0 : this.index++;
          player.playVideo();
        }
      });

      $rootScope.$on('addSong', (evt, obj) => {
        this.songsList.push(obj);
        // console.log('song added', obj)
      });

      $rootScope.$on('playSong', (evt, obj) => {
        this.songUrl = obj.id.videoId;
        // console.log(this.songUrl);
        if (this.songsList.indexOf(obj) >= 0) {
          this.index = this.songsList.indexOf(obj) + 1;
        }
      });

      $rootScope.$on('addPlaylist', (evt, list) => {
        // console.log(list);
        for (let i = 0, len = list.length; i < len; i++) {
          this.songsList.push(list[i]);
        }
      })

      $rootScope.$on('playPlaylist', (evt, list) => {
        // console.log(list);
        this.clearList();
        this.index = 1;
        this.songUrl = list[0].url;
        for (let i = 0, len = list.length; i < len; i++) {
          this.songsList.push(list[i])
        }
      });
    };

    this.playNow = (obj) => {
      $log.log('play it', obj.snippet.thumbnails.high.url);
      $rootScope.$emit('playSong', obj);
    };

    this.clearList = () => {
      this.songsList = [];
    };

    this.close = () => {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(() => {
          $log.debug('Playlist closed !');
        });
    };

    this.savePlaylist = (songslist) => {
      let playlist = [];
      for (let song of songslist) {
        let newSong = {
          title: song.title,
          artist: song.artist,
          url: song.url,
          thumbnail: song.snippet.thumbnails.high.url
        };
        console.log('new song', newSong);
        SongsService.save(newSong, (savedSong) => {
          playlist.push(savedSong);
        })
      }
      console.log('playlist', playlist);
    }

  }
}