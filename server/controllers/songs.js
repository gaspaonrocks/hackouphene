'use strict';

import Songs from '../models/songs';

class SongsController {

  find(req, res, next) {
    Songs.find(req.query, (err, songs) => {
      if (err) {
        next(err);
      } else {
        res.json(songs);
      }
    });
  }

  save(req, res, next) {
    Songs.create(req.body, (error, song) => {
      if (error) {
        next(error);
      } else {
        res.json(song);
      }
    });
  }

  update(req, res, next, currentSong) {
    // TODO : rewrite update function
    if (req.params.id == currentSong._id) {
      Songs.findOneAndUpdate(req.params.id, req.body, {
          new: true,
        },
        (err, song) => {
          if (err) {
            next(err);
          } else {
            res.json(song);
          }
        });
    } else {
      errorNotAdmin(res);
    }
  }
}

export default SongsController;