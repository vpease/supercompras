// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider,$compileProvider) {
      $compileProvider.imgSrcSanitizationWhitelist('img/');
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
          })
          .state('tab.dash', {
            url: '/dash',
            views: {
              'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
              }
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
                res = Cats.all();
                return res;
              }
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
              cat: function($stateParams){
                res = $stateParams.get(catId);
                return res;
              },
              cols: function(Cats,$stateParams){
                res = Cats.getCols($stateParams.catId);
                return res;
              }
            }
          })
          .state('tab.cat-detail.comic',{
            url: '/cat/:catId/:colId',
            views:{
              'tab-cats':{
                templateUrl: 'templates/cat-detail-comics.html',
                controller: 'CatDetailComicsCtrl'
              }
            },
            resolve: {
              cat: function($stateParams){
                res = $stateParams.catId;
                return res;
              },
              col: function($stateParams){
                res = $stateParams.colId;
                return res;
              },
              comics: function(Cats,$stateParams){
                res = Cats.getComics($stateParams.catId,$stateParams.colId);
                return res;
              }
            }
          })
          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
              }
            }
          });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
});

