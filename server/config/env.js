'use strict';

let config = {

  development: {
    db: process.env.MONGODB_URI ||  'mongodb://localhost:27017/hackouphene-dev',
    cookieToken: 'mean-token',
    jwtSecret: 'cJbdB3t$',
    facebookAuth: {
      clientID: process.env.FACEBOOK_ClientId,
      clientSecret: process.env.FACEBOOK_ClientSecret,
      callbackURL: '/api/auth/facebook/callback'
    }
  },

  production: {
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/hackouphene',
    cookieToken: 'mean-token',
    jwtSecret: 'cJbdB3t$',
    facebookAuth: {
      clientID: process.env.FACEBOOK_ClientId,
      clientSecret: process.env.FACEBOOK_ClientSecret,
      callbackURL: '/api/auth/facebook/callback'
    }
  }
};

export default config;