angular.module('services', ['db'])

/**
 * A simple example service that returns some data.
 */
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
      //DB.bulk(cols);
      //DB.bulk(comics);
    },
    getDoc: function(docid){
      var dfd =$q.defer();
      DB.get(docid)
          .then(function(result){
            console.log('Recuperando un doc');
            dfd.resolve(result);
          });
    },
    getCatalogos: function(){
      var dfd = $q.defer();
      DB.getAll({startkey: 'cat',endkey:'cat\uffff',include_docs:true})
          .then(function(result){
            console.log('Recuperando catálogos');
            dfd.resolve(result);
          });
      return dfd.promise;
    },
    getColecciones: function(catid){
      var dfd = $q.defer();
      DB.getView('comics/colecciones',{startkey:[catid],endkey:[catid,{}], include_docs:true,descending:true})
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
          })
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
          });
      return dfd.promise;
    },
    getDB: function(key){
      var dfd = $q.defer();
      DB.get(key)
          .then(function(result){
            console.log('Recuperando un documento');
            dfd.resolve(result);
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
      // Simple index lookup
      var dfd = $q.defer();
      angular.forEach(cats,function(cat){
        if (cat._id == catId){
          res = cat;
        }
      });
      dfd.resolve(res);
      return dfd.promise;
    },
    getCol: function(colId){
      var res;
      var dfd =$q.defer();
      angular.forEach(cols,function(col){
        if (col._id == colId){
          res = col
        }
      });
      dfd.resolve(res);
      return dfd.promise;
    },
    getCols: function(catId){
      var res = [];
      var dfd =$q.defer();
      angular.forEach(cols,function(col){
        if (col.catid == catId){
          res.push(col);
        }
      });
      dfd.resolve(res);
      return dfd.promise;
    },
    getComics: function(colId){
      var res = [];
      var dfd =$q.defer();
      angular.forEach(comics,function(comic){
        if (comic.colid == colId){
          res.push(comic);
        }
      });
      dfd.resolve(res);
      return dfd.promise;
    },
    getComic: function(comicId){
      var res;
      var dfd =$q.defer();
      angular.forEach(comics,function(comic){
        if (comic._id == comicId){
          res = comic;
        }
      });
      dfd.resolve(res);
      return dfd.promise;
    }
  }
});

