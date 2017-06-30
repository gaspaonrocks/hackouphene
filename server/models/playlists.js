'use strict';

import settings from '../utilities/settings';
import strings from '../utilities/strings';
import mongoose from 'mongoose';

let PlaylistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  facebook: {
    id: String,
    token: String,
    photo: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Playlist', PlaylistSchema);