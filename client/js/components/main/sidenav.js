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
        // console.log('im ready!');
        player.playVideo();
      });

      $scope.$on('youtube.player.ended', ($event) => {
        if (this.songsList.length > 0) {
          $rootScope.$emit('currentSong', (this.songsList[this.index]));
          this.songUrl = this.songsList[this.index].url;
          this.index == this.songsList.length - 1 ? this.index = 0 : this.index++;
        }
      });

      $rootScope.$on('addSong', (evt, obj) => {
        this.songsList.push(obj);
      });

      $rootScope.$on('playSong', (evt, obj) => {
        this.songUrl = obj.id.videoId;
        $rootScope.$emit('currentSong', obj);
        if (this.songsList.indexOf(obj) >= 0) {
          this.index = this.songsList.indexOf(obj) + 1;
        }
      });

      $rootScope.$on('prevSong', (evt) => {
        if (this.songsList.length > 0) {
          this.index - 2 < 0 ? this.index = this.songsList.length + this.index - 2 : this.index -= 2;
          $rootScope.$emit('currentSong', (this.songsList[this.index]));
          this.songUrl = this.songsList[this.index].url;
          this.index == this.songsList.length - 1 ? this.index = 0 : this.index++;
        }
      });

      $rootScope.$on('nextSong', (evt) => {
        if (this.songsList.length > 0) {
          $rootScope.$emit('currentSong', (this.songsList[this.index]));
          this.songUrl = this.songsList[this.index].url;
          this.index == this.songsList.length - 1 ? this.index = 0 : this.index++;
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
        $rootScope.$emit('currentSong', (this.songsList[this.index]));
        this.songUrl = list[0].url;
        for (let i = 0, len = list.length; i < len; i++) {
          this.songsList.push(list[i])
        }
      });
    };

    this.playNow = (obj) => {
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