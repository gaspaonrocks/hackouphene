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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tags'
  }],
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  private: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Playlist', PlaylistSchema);