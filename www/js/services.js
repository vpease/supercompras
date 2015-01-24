angular.module('services', ['db'])

/**
 * A simple example service that returns some data.
 */
.factory('Ads',function($q,$cordovaDevice,$cordovaAdMob){
        var platform ="";
        var admobid = {};
        return {
            getPlat: function(){
                var dfd = $q.defer();
                //platform = $cordovaDevice.getPlatform();

                if( /(android)/i.test(navigator.userAgent) ) { // for android
                    admobid = {
                        banner: 'ca-app-pub-8360727579286709/4765103872', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-8360727579286709/6241837074'
                    };
                } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                    admobid = {
                        banner: 'ca-app-pub-8360727579286709/4485902276', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-8360727579286709/5962635473'
                    };
                } else { // for windows phone
                    admobid = {
                        banner: 'ca-app-pub-8360727579286709/5823034677', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-8360727579286709/7299767879'
                    };
                }
                dfd.resolve(admobid);
                return dfd.promise;
            },
            getAdid: function(){
                return admobid;
            }
        }
    })
.factory('Cats', function($q,DB) {
      var cats = [
        { _id: 'cat1', tipo: 'catalogo', avatar: 'img/cats/avatar01.png', class:'cat01', name: 'Marvel', image:'img/cats/cat01.png', color: 'red'},
        { _id: 'cat2', tipo: 'catalogo', avatar: 'img/cats/avatar02.png', class:'cat02', name: 'DC',image:'img/cats/cat02.png', color: 'blue' },
        { _id: 'cat3', tipo: 'catalogo', avatar: 'img/cats/avatar03.png', class:'cat03', name: 'Image',image:'img/cats/cat03.png', color: 'yellow' },
        { _id: 'cat4', tipo: 'catalogo', avatar: 'img/cats/avatar04.png', class:'cat04', name: 'Dark Horse',image:'img/cats/cat04.png', color: 'cyan' },
        { _id: 'cat5', tipo: 'catalogo', avatar: 'img/cats/avatar05.png', class:'cat05', name: 'Peru21',image:'img/cats/cat05.png', color: 'white' },
        { _id: 'cat6', tipo: 'catalogo', avatar: 'img/cats/avatar06.png', class:'cat06', name: 'VUK',image:'img/cats/cat06.png', color: 'black' }
      ];
  return {
      data: function(){
          DB.init();
          //DB.bulk(cats);
          // DB.bulk(cols);
          // DB.bulk(comics);
      },
      getDB: function(key){
          var dfd = $q.defer();
          DB.get(key)
              .then(function(result){
                  console.log('Recuperando un documento');
                  dfd.resolve(result);
              },function(error){
              console.log('Error en get'+error);
          });
          return dfd.promise;
      },
      getCatalogos: function(){
          var dfd = $q.defer();
          DB.getAll({startkey: 'cat',endkey:'cat\uffff',include_docs:true})
              .then(function(result){
                  console.log('Recuperando catálogos');
                  dfd.resolve(result);
              },function(error){
                  console.log('Error en getCatalogos: '+error);
              });
          return dfd.promise;
      },
      getColecciones: function(catid){
          var dfd = $q.defer();
          DB.getView('comics/colecciones',{startkey:[catid,{}],endkey:[catid], include_docs:true,descending:true})
              .then(function(result){
                  console.log('Recuperando colecciones');
                  dfd.resolve(result);
              },function(error){
                  console.log('Error en getColecciones:'+error);
              });
          return dfd.promise;
      },
      getUltimos: function(salto,limite){
          var dfd =$q.defer();
          DB.getView('comics/ultimos',{skip:salto, limit:limite, descending:true,include_docs:true})
              .then(function(result){
                  console.log('Recuperando Ultimos');
                  dfd.resolve(result);
              },function(error){
                  console.log('Error en getUltimo:'+error);
              });
          return dfd.promise;
      },
      getComs: function(colid){
          var dfd = $q.defer();
          stkey ='com_'+colid;
          enkey = stkey+'\uffff';
          DB.getAll({startkey:stkey,endkey:enkey,include_docs:true})
              .then(function(result){
                  console.log('Recuperando comics');
                  dfd.resolve(result);
              },function(error){
                  console.log('Error en getComs'+error);
              });
          return dfd.promise;
      },
      getBarcode: function(){
          var dfd =$q.defer();
          DB.getView('comics/barcode',{descending:true,group:true})
              .then(function(result){
                  console.log('Recuperando Ultimos');
                  dfd.resolve(result);
              },function(error){
                  console.log('Error en getUltimo:'+error);
              });
          return dfd.promise;
      },
      put: function(object){
          DB.put(object);
      },
      all: function() {
          var dfd = $q.defer();
          res = cats;
          dfd.resolve(res);
          return dfd.promise;
      },
      get: function(catId) {
          var dfd = $q.defer();
          angular.forEach(cats,function(cat){
              if (cat._id == catId){
                  res = cat;
              }
          });
          dfd.resolve(res);
          return dfd.promise;
      }
  }
});

