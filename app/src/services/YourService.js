angular.service('YourService', ['$scope', function() {
  "use strict";

  var $this = {

    /**
     * Get movies list
     * @return {Promise}
     */
    getMoviesList: function(payload) {
      console.log('payload', payload);

      return new Promise(function(resolve, reject) {
        resolve([{
          artist: 'Xuxa Meneghel',
          product: 'Amor Estranho Amor',
          type: 'adult'
        }, {
          artist: 'Xuxa Meneghel',
          product: 'O Mistério de Feiurinha',
          type: 'childlike'
        }, {
          artist: 'Pelé',
          product: 'Fuga para a Vitória',
          type: 'sport'
        }]);
      });
    }
  };

  return $this;
}]);
