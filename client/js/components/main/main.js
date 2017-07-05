'use strict';

import template from './main.html';
import styles from './main.scss';

export default {

  template: template,
  css: styles,

  controller: function (AuthService, $state, $transitions, $log, $mdToast, $scope, $rootScope, CONSTANTS, $mdSidenav) {
    'ngInject';

    $transitions.onSuccess({}, (transition) => {
      // Watch route change to update the selected menu tab
      this.selectedTab = transition.to().name;
      $log.debug('TAB:' + this.selectedTab);
    });

    this.$onInit = () => {
      AuthService.getCurrent().then((user) => {
          // Save the currently connected user if any
          this.user = user;
        })
        .catch((err) => {
          $log.info(err);
          this.user = null;
        });

      this.urlList = [];
      this.songsList = [];
      this.index = 1;
    };

    this.logout = () => {
      // Disconnect and display home page
      AuthService.logout().then(() => {
        $state.go('home');
      });
    };

    // Listen at authentication messages (see auth service)
    $rootScope.$on(CONSTANTS.authEvent, (evt, user) =>  {
      // Save the currently connected user and display the according message
      this.user = user;
      if (user) {
        $mdToast.showSimple(`Welcome ${user.firstName} !`);
      } else {
        $mdToast.showSimple('Disconnected');
      }
    });

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
        console.log('song added', obj)
      });

      $rootScope.$on('playSong', (evt, obj) => {
        this.songUrl = obj.id.videoId;
        console.log(this.songUrl);
        if (this.songsList.indexOf(obj) >= 0) {
          this.index = this.songsList.indexOf(obj) + 1;
        }
      }); // $rootScope.$on('playSong'

      $rootScope.$on('addPlaylist', (evt, list) => {
        console.log(list);
        for (let i = 0, len = list.length; i < len; i++) {
          this.songsList.push(list[i]);
        }
      })

      $rootScope.$on('playPlaylist', (evt, list) => {
        console.log(list);
        this.clearList();
        this.index = 1;
        this.songUrl = list[0].url;
        for (let i = 0, len = list.length; i < len; i++) {
          this.songsList.push(list[i])
        }
      }); // $rootScope.$on('playPlayList'
    }; //this.$onChanges

    this.playNow = (obj) => {
      $rootScope.$emit('playSong', obj);
    };

    this.clearList = () => {
      this.songsList = [];
    };

    this.toggleRight = buildToggler('right');
    this.isOpenRight = () => {
      return $mdSidenav('right').isOpen();
    };

    function buildToggler(navID) {
      return () => {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(() => {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    this.close = () => {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(() => {
          $log.debug("Playlist closed !");
        });
    };
  }
}