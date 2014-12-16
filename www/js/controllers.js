angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CatsCtrl', function($scope,$ionicSlideBoxDelegate, cats) {
        $scope.cats = cats;
        $scope.navSlide = function(index){
            $ionicSlideBoxDelegate.slide(index,500);
            alert("Slide: "+index);
        }
        $scope.navChanged = function(index){

        }
})
.controller('CatDetailCtrl', function($scope, $stateParams, cat) {
  $scope.cat = cat;
})

.controller('AccountCtrl', function($scope) {
});
