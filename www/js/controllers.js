angular.module('controllers', [])
    .controller('LoginCtrl',function($scope,Cats){
        Cats.data();
    })
    .controller('DashCtrl', function($scope,Cats) {
        //Cats.data();
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
    .controller('CatDetailCtrl', function($scope,cat,cols) {
        $scope.cat = cat;
        $scope.cols=cols.rows;
    })
    .controller('CatDetailComicsCtrl',function($scope,cat,col,comics){
        $scope.cat= cat;
        $scope.col = col;
        $scope.comics = comics.rows;

    })
    .controller('CatDetailComicCtrl',function($scope,cat,col,comic){
        $scope.cat= cat;
        $scope.col = col;
        $scope.comic = comic;

    })
    .controller('AccountCtrl', function($scope) {

    });
