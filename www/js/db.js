/**
 * Created by vpease on 20/12/2014.
 */
angular.module('db',['pouchdb'])

.factory('DB',function($q,pouchDB) {
        var self = this;
        self.db;
        self.init = function() {
            if (!self.db) {
                console.log('database is closed');
                self.db = pouchDB('supercomics',{adapter: 'websql'});
                //self.db = pouchDB('supercomics',{adapter: 'idb'});
                console.log('ya se grabó')
            }
        };
        self.gql = function(gql){
            if (!self.db){
                self.init();
            }
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
            self.db.get(object._id,function(err,doc){
                if (!err){
                    return doc;
                } else {
                    return null;
                }
            });
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