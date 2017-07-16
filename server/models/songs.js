'use strict';

import settings from '../utilities/settings';
import strings from '../utilities/strings';
import mongoose from 'mongoose';

let SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: String,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tags'
  }],
  url: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    type: String
  }
});

export default mongoose.model('Song', SongSchema);