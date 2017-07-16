'use strict';

export default function ($resource, CONSTANTS) {
  'ngInject';

  return $resource(CONSTANTS.playlistsUrl + '/:id', {
    id: '@_id'
  });
}