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

                //console.log('voy a cargar el plugin');
                //PouchDB.plugin("pouchdb-load");
                //console.log('ya cargué el plugin');

                self.db = new window.PouchDB('supercomics',{
                    adapter: 'websql',
                    size:2000,
                    auto_compaction:true});
                if (!self.db.adapter){
                    self.db  = new PouchDB('supercomics');
                }

                self.initial();

                self.db.compact().then(function(info){
                    console.log('DB compactada: ' +info);
                }).catch(function(err){
                    console.log('Error mientras compactando: '+ err);
                });

                console.log('ya se grabó');
            }
        };
        self.initial = function(){
            initial = window.localStorage['initial']||'false';
            if (initial){
                var dumpFiles = [
                    'data_00000000.txt',
                    'data_00000001.txt',
                    'data_00000002.txt',
                    'data_00000003.txt',
                    'data_00000004.txt',
                    'data_00000005.txt',
                    'data_00000006.txt',
                    'data_00000007.txt',
                    'data_00000008.txt',
                    'data_00000009.txt',
                    'data_00000010.txt',
                    'data_00000011.txt',
                    'data_00000012.txt',
                    'data_00000013.txt'
                ];
                window.PouchDB.utils.Promise.all(dumpFiles.map(function (dumpFile) {
                    return self.db.load('data/' + dumpFile);
                })).then(function () {
                    console.log('Carga correcta');
                    window.localStorage['initial']='true';
                    $rootScope.$broadcast('dbinit:uptodate');
                }).catch(function (err) {
                    console.log('Error en la carga')
                });
            } else {
                $rootScope.$broadcast('dbinit:uptodate');
            }
        };
        self.replicate = function(){
            var sync = self.db.replicate.from(
                'http://supermio.iriscouch.com:5984/supercomics',
                {live:true, retry:true})
                .on('change',function(info){
                    console.log('Cambios en la base de datos'+info);
                }).on('complete',function(info){
                    console.log('Sync data complete'+info);

                }).on('uptodate',function(info){
                    console.log('Actualizado datos'+info);
                    $rootScope.$broadcast('db:uptodate');
                }).on('error',function(err){
                    console.log('Error en sync datos: '+err);
                })
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
        self.getAttach = function(key,attach){
            return self.db.getAttachment(key,attach);
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