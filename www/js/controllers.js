angular.module('controllers', [])
    .controller('LoginCtrl',function($scope,$cordovaAdMob,Cats,Ads){
        //Cats.data();

    })
    .controller('DashCtrl', function($scope,Cats,comics) {
        $scope.comics = comics.rows;
        getCover = function(){
            angular.forEach($scope.comics,function(comic){
                Cats.getAttach(comic.id,comic.key[5])
                    .then (function (result){
                        comic.key[5] = result;
                        console.log(result);
                    }, function (error){
                    console.log('Error en el blob:'+ eror);
                });
                    console.log('cover del comic cargado');
                Cats.getAttach(comic.doc._id,Object.keys(comic.doc._attachments)[0])
                    .then (function (result){
                        comic.doc.tipo = result;
                        console.log(result);
                    //};
                    console.log('cover del comic cargado');
                },function (error){
                    console.log('problemas con el cover del comic')
                });
            });
        };
        getCover();
    })
    .controller('CatsCtrl', function($scope,$ionicSlideBoxDelegate, cats) {
        $scope.cats = cats.rows;
        $scope.navSlide = function(index){
            $ionicSlideBoxDelegate.slide(index,500);
            alert("Slide: "+index);
        };
        $scope.navChanged = function(index){

        }
    })
    .controller('CatDetailCtrl', function($scope,cat,cols,Cats) {
        $scope.cat = cat;
        $scope.cols = cols.rows;
        getCover = function(){
            angular.forEach($scope.cols,function(col){
                Cats.getAttach(col.doc._id,Object.keys(col.doc._attachments)[0])
                    .then (function (result){
                    col.doc.tipo = result;
                    console.log(result);
                    //};
                    console.log('cover del comic cargado');
                },function (error){
                    console.log('problemas con el cover del comic')
                });
            });
        };
        getCover();
    })
    .controller('CatDetailComicsCtrl',function($scope,cat,col,comics,Cats){
        $scope.cat= cat;
        $scope.col = col;
        $scope.comics = comics.rows;
        getCover = function(){
            Cats.getAttach(col._id,Object.keys(col._attachments)[0])
                .then (function (result){
                col.tipo = result;
                console.log(result);
                //};
                console.log('cover del comic cargado');
            },function (error){
                console.log('problemas con el cover del comic')
            });
            angular.forEach($scope.comics,function(comic){
                Cats.getAttach(comic.id,Object.keys(comic.doc._attachments)[0])
                    .then (function (result){
                    comic.doc.tipo = result;
                    console.log(result);
                }, function (error){
                    console.log('Error en el blob:'+ eror);
                });
                console.log('cover del comic cargado');
            });
        };
        getCover();
    })
    .controller('CatDetailComicCtrl',function($scope,cat,col,comic,Cats){
        $scope.cat= cat;
        $scope.col = col;
        $scope.comic = comic;
        getCover = function(){
            Cats.getAttach(comic._id,Object.keys(comic._attachments)[0])
                .then (function (result){
                comic.tipo = result;
                console.log(result);
                //};
                console.log('cover del comic cargado');
            },function (error){
                console.log('problemas con el cover del comic')
            });
        };
        getCover();
    })
    .controller('BuscarCtrl',function($scope,codigos){
        $scope.barcodes= codigos;
    })
    .controller('AccountCtrl', function($scope) {

    });
