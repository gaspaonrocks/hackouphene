'use strict';

import PlaylistsController from '../controllers/playlists.js';

export default function (router) {

  let ctrl = new PlaylistsController();

  // Saving the playlist
  router.post('/playlists', (req, res, next) => {
    return ctrl.save(req, res, next);
  })

}