/**
 * Created by vpease on 20/12/2014.
 */
angular.module('db',[])

.factory('DB',function($q,$rootScope) {
        var self = this;
        self.db;
        self.init = function() {
            if (!self.db) {
                console.log('database is closed');
                self.db = new PouchDB('supercomics',{adapter: 'websql',auto_compaction:true});
                self.db.compact().then(function(info){
                    console.log('DB compactada');
                }).catch(function(err){
                    console.log('Error mientras compactando');
                });
                //self.db = pouchDB('supercomics',{adapter: 'idb'});
                console.log('ya se grabó');
                var sync = self.db.replicate.from(
                    'http://vpease.couchappy.com/supercomics',
                    {live:true})
                    .on('change',function(info){
                        console.log('Cambios en la base de datos'+info);
                    }).on('complete',function(info){
                        console.log('Sync complete'+info);

                    }).on('uptodate',function(info){
                        console.log('Actualizado'+info);
                        $rootScope.$broadcast('db:uptodate');
                    }).on('error',function(err){
                        console.log('Error: '+err);
                    })
            }
        };
        self.getView = function(view,options){
            return self.db.query(view,options);
        };
        self.getAll = function(query){
          return self.db.allDocs(query);
        };
        self.remove = function (key){
          self.db.remove(key,function(err,response){
              if (err){
                  console.log(err);
              } else {
                  console.log(response);
              }
          });
        };
        self.get = function(key){
            return self.db.get(key);
        };
        self.put = function(object){
            if (!self.db){
                self.init();
            }
            self.db.get(object._id,function(err,doc){
                if (!err){
                    if (doc){
                        object._rev = doc._rev;
                        doc = object;
                        self.db.put(doc).then(function(response){
                            console.log('Update Ok');
                        }).catch(function(error){
                            console.log('Error en Update:'+error.toString());
                        });
                    } else {
                        self.db.put(object).then(function(response){
                            console.log('Insert Ok');
                        }).catch(function(error){
                            console.log('Error al insertar: '+error.toString());
                        });
                    }
                } else {
                    if (err.status==404){
                        self.db.put(object).then(function(response){
                            console.log('Insert Ok');
                        }).catch(function(error){
                            console.log('Error al insertar: '+error.toString());
                        });
                    } else {
                        console.log("Error: "+err);
                    }
                }
            });
        };
        self.bulk = function(objects){
            if (!self.db){
                self.init();
            };
            self.db.bulkDocs(objects,{new_edits:true},function(err,response){
                if (!err){
                    console.log('Todo ok con el bulk: '+response.toString());
                } else {
                    console.log('Error:'+ err.toString());
                }
            });
        }
    return self;
})