'use strict'

(function(){
  var app = angular.module('app', ['ngRoute', 'ngGrid', 'restangular']);

  app.config(['$routeProvider',
    function($routeProvider){
      //maked app.keywords/KeywordsControllerjs handle the urls
      $routeProvider.
        when('/', {
          templateUrl: 'app/keywords/partials/editor.html',
          controller: 'KeywordsController'
        });
    }]);
})(); //defines entry point for the angular app
