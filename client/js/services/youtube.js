'use strict';

export default function ($resource, CONSTANTS) {
  'ngInject';

  return $resource(CONSTANTS.youtubeUrl, {
    query: '@query'
  });
}