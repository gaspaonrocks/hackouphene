'use strict';

export default function ($resource, CONSTANTS, $q, $http) {
  'ngInject';

  // return $resource(CONSTANTS.youtubeUrl, {
  //   query: '@query'
  // });

  this.searchVideos = (param) => {
    console.log('service', param)
    return $q((resolve, reject) => {
      $http.post(CONSTANTS.youtubeUrl, param.field).then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}