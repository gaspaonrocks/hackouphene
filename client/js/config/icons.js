'use strict';

export default function ($sceDelegateProvider, $mdIconProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    // Adding 'self' to the whitelist, will allow requests from the current origin.
    'self',
    'https://use.fontawesome.com/fcf6944e1e.js',

    // Using double asterisks here, will allow all URLs to load.
    // We recommend to only specify the given domain you want to allow.
    // '**'
  ]);

  $mdIconProvider
    .defaultFontSet('fa') // This sets our default fontset className.
    .defaultIconSet('https://use.fontawesome.com/fcf6944e1e.js') // Register a default set of SVG icons
    .iconSet('player', 'my/app/player.svg') // Register a named icon set of SVGs

};