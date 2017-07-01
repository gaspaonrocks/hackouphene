'use strict';

import settings from '../utilities/settings';
import strings from '../utilities/strings';
import mongoose from 'mongoose';

let PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  songs: {
    type: Array
  },
  private: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Playlist', PlaylistSchema);