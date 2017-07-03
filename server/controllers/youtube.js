'use strict';

import YouTube from 'youtube-node';

let youtube = new YouTube();

youtube.setKey('AIzaSyCZRnJtykOp7rTuV3W0cm3d8J-JgGYu6lU');

class YoutubeController {

  query(req, res, next) {
    youtube.search(req.body, 20, (error, result) => {
      if (error) {
        next(error);
      } else {
        res.json(result);
      }
    });
  }
}

export default YoutubeController;