angular.module('comics', ['ionic', 'controllers', 'services'])
    .run(function($ionicPlatform,Ads,Cats) {
        $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            };
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            console.log("App is ready!!");
            window.localStorage['cordovaready']='true';



            Ads.getPlat().then(function(result){
                if (result){
                    console.log('Se ha recuperado la plataforma:' + result);
                    var options = {
                        publisherID: result.banner,
                        adSize: 'SMART_BANNER',
                        bannerAtTop: true, // Set to true, to put banner at top
                        overlap: false, // True to allow banner overlap webview
                        offsetTopBar: true, // True to avoid ios7 status bar overlap
                        isTesting: true, // receiving test to
                        Autoshow: true // auto show interstitial When loaded to
                  };
                    var admob = window.plugins.AdMob;
                    admob.createBannerView(options,
                        function () {
                            console.log ('success creando el banner');
                            admob.requestAd({ 'isTesting': true },
                                function() {
                                    admob.showAd(true);
                                },
                                function() {
                                    console.log('failed to request ad');
                                }
                            );
                        },
                        function (){
                            console.log ('error creando el banner');
                        }
                    );
                    admob.createInterstitialView({adId:result.interstitial, autoshow:false});
                    admob.showInterstitial();
                }
            }, function(error){
                console.log('Error recuperando plataforma:'+ error);
            });
            Cats.data();
        });
    })
    .run(function($rootScope,$location,Cats){
        $rootScope.$on('dbinit:uptodate',function(){
                       console.log('Terminó la syncronizacion de diseño');
            ready = window.localStorage['cordovaready']||'false';
            while (ready=='false') {
                ready = window.localStorage['cordovaready']||'false';
            };
            $location.path('/tab/cats');
            $rootScope.$apply();
            Cats.replicate();
        });
         $rootScope.$on('db:uptodate',function(){
             console.log('Terminó la syncronizacion de datos');
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
          .state('loading',{
              url:"/app",
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
            resolve:{
              comics:function(Cats){
                res = Cats.getUltimos(0,20);
                return res;
              }
            },
            onEnter: function($ionicHistory){
                console.log('Estoy en el estado tab.dash');
                $ionicHistory.clearHistory();
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
          .state('tab.buscar.result',{
              url: '/:barcode',
              views: {
                  'tab-buscar': {
                      templateUrl: 'templates/buscar-res.html',
                      controller: 'BuscarResCtrl'
                  }
              },
              resolve: {
                  cols: function(Cats,$stateParams){
                      res = Cats.getBarcode($stateParams.barcode);
                      return res;
                  }
              },
              onEnter: function(){
                  console.log('Entrando al estado Buscar.result');
              },
              onExit: function(){
                  console.log('Saliendo del estado Buscar.result');
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
      $urlRouterProvider.otherwise('/app');
});
