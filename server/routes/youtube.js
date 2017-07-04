'use strict';

import YoutubeController from '../controllers/youtube.js';

export default function (router) {

  let ctrl = new YoutubeController();

  // The user creation route must not be authenticated (signup process)
  router.post('/youtube', (req, res, next) => {
    ctrl.query(req, res, next)
  });
}