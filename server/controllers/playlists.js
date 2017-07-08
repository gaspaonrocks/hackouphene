'use strict';

import Playlists from '../models/playlists';

class PlaylistsController {

  find(req, res, next) {
    if (currentUser) {
      User.find(req.query, (err, playlists) => {
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
    if (currentUser && (req.params.id == currentUser._id || currentUser.isAdmin)) {
      User.findOneAndUpdate(req.params.id, req.body, {
          new: true,
        },
        (err, user) => {
          if (err) {
            next(err);
          } else {
            res.json(user);
          }
        });
    } else {
      errorNotAdmin(res);
    }
  }
}

export default PlaylistsController;