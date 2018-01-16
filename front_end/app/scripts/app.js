'use strict';

/**
 * @ngdoc overview
 * @name markNewsReaderApp
 * @description
 * # markNewsReaderApp
 *
 * Main module of the application.
 */
angular
  .module('markNewsReaderApp', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'markNewsReaderApp.services',
    'yaru22.angular-timeago'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
