// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
    .run(function($rootScope,$location){
      $rootScope.$on('db:uptodate',function(){
        $location.path('/tab/dash');
        $rootScope.$apply();
      });
    })
.config(function($stateProvider, $urlRouterProvider,$compileProvider) {
      $compileProvider.imgSrcSanitizationWhitelist('.*');
      //$compileProvider.imgSrcSanitizationWhitelist('img/*');
      //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
          .state('login',{
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "LoginCtrl",
            onEnter: function(){
              console.log('Estoy en el estado login');
            },
            onExit: function(){
              console.log('Saliendo del estado login')
            }
          })
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
            onEnter: function(){
              console.log('Estoy en el estado tab');
            },
            onExit: function(){
              console.log('Saliendo del estado tab')
            }
          })
          .state('tab.dash', {
            url: '/dash',
            views: {
              'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.dash');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.dash')
            }
          })
          .state('tab.cats', {
            url: '/cats',
            views: {
              'tab-cats': {
                templateUrl: 'templates/tab-cats.html',
                controller: 'CatsCtrl'
              }
            },
            resolve: {
              cats: function(Cats){
                res = Cats.getCatalogos();
                return res;
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.cats');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.cats')
            }
          })
          .state('tab.cat-detail', {
            url: '/cat/:catId',
            views: {
              'tab-cats': {
                templateUrl: 'templates/cat-detail.html',
                controller: 'CatDetailCtrl'
              }
            },
            resolve: {
              cat: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.catId);
                return res;
              },
              cols: function(Cats,$stateParams){
                res = Cats.getColecciones($stateParams.catId);
                return res;
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.cat-detail');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.cat-detail')
            }
          })
          .state('tab.comics',{
            url: '/comics/:catId/:colId',
            views:{
              'tab-cats':{
                templateUrl: 'templates/cat-comics.html',
                controller: 'CatDetailComicsCtrl'
              }
            },
            resolve: {
              comics: function(Cats,$stateParams){
                res = Cats.getComs($stateParams.colId);
                return res;
              },
              cat: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.catId);
                return res;
              },
              col: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.colId);
                return res;
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.comics');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.comics')
            }
          })
          .state('tab.comic',{
            url: '/comic/:catId/:colId/:comicId',
            views:{
              'tab-cats':{
                templateUrl: 'templates/cat-comic.html',
                controller: 'CatDetailComicCtrl'
              }
            },
            resolve: {
              comic: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.comicId);
                return res;
              },
              cat: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.catId);
                return res;
              },
              col: function(Cats,$stateParams){
                res = Cats.getDB($stateParams.colId);
                return res;
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.comic');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.comic')
            }
          })
          .state('tab.buscar', {
            url: '/buscar',
            views: {
              'tab-buscar': {
                templateUrl: 'templates/tab-buscar.html',
                controller: 'BuscarCtrl'
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.buscar');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.buscar')
            }
          })
          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
              }
            },
            onEnter: function(){
              console.log('Estoy en el estado tab.account');
            },
            onExit: function(){
              console.log('Saliendo del estado tab.account')
            }
          });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
      $urlRouterProvider.otherwise('/login');
});

