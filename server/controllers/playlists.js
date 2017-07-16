'use strict';

import Playlists from '../models/playlists';

class PlaylistsController {

  find(req, res, next) {
    if (currentUser) {
      Playlists.find(req.query, (err, playlists) => {
        if (err) {
          next(err);
        } else {
          res.json(playlists);
        }
      });
    }
  }

  save(req, res, next) {
    Playlists.create(req.body, (error, result) => {
      if (error) {
        next(error);
      } else {
        res.json(result);
      }
    });
  }

  update(req, res, next, currentPlaylist) {
    // TODO : rewrite update function
    if (req.params.id == currentPlaylist._id) {
      User.findOneAndUpdate(req.params.id, req.body, {
          new: true,
        },
        (err, playlist) => {
          if (err) {
            next(err);
          } else {
            res.json(playlist);
          }
        });
    } else {
      errorNotAdmin(res);
    }
  }
}

export default PlaylistsController;