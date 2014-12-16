angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Cats', function($q) {
      var cats = [
        { id: 0,
          avatar: 'img/cats/avatar01.png',
          class:'cat01',
          name: 'Marvel',
          image:'img/cats/cat01.png',
          color: 'red'},
        { id: 1, avatar: 'img/cats/avatar02.png', class:'cat02', name: 'DC',image:'img/cats/cat02.png', color: 'blue' },
        { id: 2, avatar: 'img/cats/avatar03.png', class:'cat03', name: 'Image',image:'img/cats/cat03.png', color: 'yellow' },
        { id: 3, avatar: 'img/cats/avatar04.png', class:'cat04', name: 'Dark Horse',image:'img/cats/cat04.png', color: 'cyan' },
        { id: 4, avatar: 'img/cats/avatar05.png', class:'cat05', name: 'Peru21',image:'img/cats/cat05.png', color: 'white' },
        { id: 5, avatar: 'img/cats/avatar06.png', class:'cat06', name: 'VUK',image:'img/cats/cat06.png', color: 'black' }
      ];
      var cols = [
        {
          id: 0,
          colName: 'Crisis de mundos infinitos',
          numeros: 12,
          cover: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6QUNFNENBQkM1QkFBMTFFNDg4MTdFM0JGRUFDQzg2NjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTU0N0VBNEM4NTQxMTFFNDgyNTBBOUJGMzAzMjdGMjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTU0N0VBNEI4NTQxMTFFNDgyNTBBOUJGMzAzMjdGMjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOTM1Q0M5OTQwODVFNDExODRBM0Y0N0M4QTJFOTZDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQ0U0Q0FCQzVCQUExMUU0ODgxN0UzQkZFQUNDODY2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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',
          catid: 0,
          tags: '',
          published: '01/01/2014'
        }
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
    },
    getCols: function(catId){
      var res = [];
      angular.foreach(cols,function(col){
        if (col.catid === catId){
          res.push(col);
        }
      });
      var dfd =$q.defer();
      dfd.resolve(res);
      return dfd.promise;
    },
    getComics: function(catId,colId){
      var res = [];
      angular.foreach(cols,function(col){
        if (col.catid === catId){
          res.push(col);
        }
      });
      var dfd =$q.defer();
      dfd.resolve(res);
      return dfd.promise;
    }
  }
});

