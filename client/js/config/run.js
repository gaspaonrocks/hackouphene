'use strict';

export default function (AuthService, $log, $q, $transitions, $templateRequest) {
  'ngInject';

  // ui-router transitions
  $transitions.onBefore({}, (transition) => {

    // Get the requested route
    var to = transition.to();

    if (!to.publicRoute) {

      return $q((resolve) => {

        AuthService.getCurrent().then(() => {
            $log.debug(to.url + ' authenticated');
            resolve();
          })
          .catch(() => {
            // User isn’t authenticated
            $log.debug(to.url + ' need authentication');
            // Redirect to login page
            resolve(transition.router.stateService.target('login.signin', {
              redirect: to.name
            }));
          });
      });
    }
  });

  let urls = ['https://use.fontawesome.com/fcf6944e1e.js'];

  angular.forEach(urls, function (url) {
    $templateRequest(url);
  });

};