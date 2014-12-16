angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Cats', function($q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cats = [
    { id: 0, avatar: 'img/cats/avatar01.png', class:'cat01', name: 'Marvel',image:'img/cats/cat01.png', color: 'red' },
    { id: 1, avatar: 'img/cats/avatar02.png', class:'cat02', name: 'DC',image:'img/cats/cat02.png', color: 'blue' },
    { id: 2, avatar: 'img/cats/avatar03.png', class:'cat03', name: 'Image',image:'img/cats/cat03.png', color: 'yellow' },
    { id: 3, avatar: 'img/cats/avatar04.png', class:'cat04', name: 'Dark Horse',image:'img/cats/cat04.png', color: 'cyan' },
    { id: 4, avatar: 'img/cats/avatar05.png', class:'cat05', name: 'Peru21',image:'img/cats/cat05.png', color: 'white' },
    { id: 5, avatar: 'img/cats/avatar06.png', class:'cat06', name: 'VUK',image:'img/cats/cat06.png', color: 'black' }
  ];

  return {
    all: function() {
      var dfd = $q.defer();
      res = cats;
      dfd.resolve(res);
      return dfd.promise;
    },
    get: function(catId) {
      // Simple index lookup
      var dfd = $q.defer();
      res = cats[catId];
      dfd.resolve(res);
      return dfd.promise;
    }
  }
});
