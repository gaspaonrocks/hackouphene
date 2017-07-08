'use strict';

import PlaylistController from '../controllers/playlists.js';

export default function (router) {

  let ctrl = new PlaylistController();

  // Saving the playlist
  router.post('/playlists', (req, res, next) => {
    return ctrl.save(req, res, next);
  })

}