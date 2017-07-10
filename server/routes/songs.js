'use strict';

import SongsController from '../controllers/songs.js';

export default function (router) {

  let ctrl = new SongsController();

  // Saving the Songs
  router.post('/songs', (req, res, next) => {
    return ctrl.save(req, res, next);
  })

}