angular.controller('YourController', ['$scope', 'OAuth2', 'YourService', function($scope, OAuth2, yourService) {
  "use strict";

  var $this = {
    OAuth: new OAuth2(),

    /**
     * Main method
     */
    main: function() {
      $this.clientId = $scope.querySelector('[data-client-id]').dataset.clientId;
      $this.addEventListeners();
    },

    /**
     * Add EventListeners function
     * @param  {Function} callback
     */
    addEventListeners: function() {
      $this.OAuth.setCallback($this.statusUpdate);
      $scope.toggleLogin = $this.toggleLogin.bind($this);
      $scope.appInit = $this.init.bind($this);
    },

    /**
     * Init method
     */
    init: function() {
      if ($this.clientId) {
        $this.OAuth.setClientId($this.clientId);
        $this.OAuth.init();
      } else {
        $scope.querySelector('#authorize-button').style.display = 'none';
        console.error('Please inform the clientId in data-client-id');
        console.log('%c          ', 'font-size: 100px; background: url(https://uploaddeimagens.com.br/images/001/210/813/original/data-client-id.png) no-repeat;');
        console.log('%c          ', 'font-size: 300px; background: url(https://9to5google.files.wordpress.com/2015/04/google-alerts.gif) no-repeat;');
      }
    },

    /**
     * Load method
     */
    load: function() {
      $this.getListMovies();
    },

    /**
     * Function that rotates when the status updates
     * @param  {Object} me [gapi object]
     */
    statusUpdate: function(me) {
      console.log(me);
      $this.me = me;
      $scope.querySelector('#authorize-button').innerHTML = me ? 'Logout' : 'Login';
      $scope.querySelector('#content').innerHTML = me ? '<p>Hello, ' + me.names[0].displayName + ' !</p>' : '';
      $scope.querySelector('#photo').style.display = me ? 'block' : 'none';
      $scope.querySelector('#photo').src = me ? me.photos[0].url : '';
      $this.load();
    },

    /**
     * Change login between login and logoff
     */
    toggleLogin: function() {
      $this.OAuth.toggleLogin();
    },

    /**
     * Get list movies
     */
    getListMovies: function() {
      if ($this.me) {
        yourService.getMoviesList({etag: $this.me.etag}).then(function(data){
          console.table(data);
        });
      }
    }
  };

  $this.main();
  return $this;
}]);
