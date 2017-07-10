'use strict';

export default function ($resource, CONSTANTS) {
  'ngInject';

  return $resource(CONSTANTS.songsUrl + '/:id', {
    id: '@_id'
  });
}