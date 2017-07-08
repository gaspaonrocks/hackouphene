'use strict';

import YoutubeController from '../controllers/youtube.js';

export default function (router) {

  let ctrl = new YoutubeController();

  // The request post a query to get the videos
  router.post('/youtube', (req, res, next) => {
    ctrl.query(req, res, next)
  });
}