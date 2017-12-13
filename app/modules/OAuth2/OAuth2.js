(function($rootScope, $scope) {
  "use strict";

  var OAuth2 = function() {
    this.apiKey;
    this.clientId;
    this.discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
    this.scopes = 'profile';
    this.isSignedIn = false;
    this.callback = new Function();
  };

  OAuth2.prototype = {

    /**
     * Init method
     * @param {Function} callback
     */
    init: function(callback) {
      var $this = this;
      this.load(this.addEventListeners.bind(this));
      if (callback) {
        this.callback = callback;
      }
    },

    /**
     * Load method
     * @param {Function} callback
     */
    load: function(callback) {
      var $this = this;
      gapi.load('client:auth2', function() {
        gapi.client.init({
            apiKey: $this.apiKey,
            discoveryDocs: $this.discoveryDocs,
            clientId: $this.clientId,
            scope: $this.scopes
        }).then(callback);
      });
    },

    /**
     * Add EventListeners function
     * @param  {Function} callback
     */
    addEventListeners: function(callback) {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    },

    /**
     * Console log
     * @param  {[type]} msg [log value]
     */
    log: function(msg) {
      /*eslint-disable */
      if (document.location.hostname === 'localhost'){
        console.clear();
        console.log('%c Google %c| API Client ', 'font-weight:bold; background: rgb(0, 150, 136); color: #FFF', 'background: rgb(0, 150, 136); color: #FFF', '::', msg);
      }
      /*eslint-enable */
    },

    /**
     * Function from update status signIn
     * @param  {[type]} value [description]
     */
    updateSigninStatus: function(value) {
      var $this = this;
      this.isSignedIn = value;
      if (value) {
        gapi.client.people.people.get({
          'resourceName': 'people/me',
          'requestMask.includeField': 'person.names'
        }).then(function(resp) {
          $this.log(resp.result.names[0].givenName + ' authenticated successfully');
          /*eslint-disable */
          if (document.location.hostname === 'localhost'){
            console.log('%c      ', 'font-size: 120px; background: url(https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/SecurityClick_1.gif) -240px -160px  no-repeat;');
            // console.log('%c      ', 'font-size: 220px; background: url(https://marketingland.com/wp-content/ml-loads/2015/02/mailchimp-high5-Brent_Clouse.gif) -75px -20px  no-repeat;');
          }
          /*eslint-enable */
          $this.callback(resp.result);
        });
      } else {
        $this.log('is not signed in');
        $this.callback();
      }
    },

    /**
     * Set API Key
     * @param  {String} value [apiKey]
     */
    setApiKey: function(value) {
      this.apiKey = value;
    },

    /**
     * Set Client Id
     * @param  {String} value [clientId]
     */
    setClientId: function(value) {
      this.clientId = value;
    },

    /**
     * Sing In on oAuth2
     */
    signIn: function() {
      gapi.auth2.getAuthInstance().signIn();
    },

    /**
     * Sing Out on oAuth2
     */
    signOut: function() {
      gapi.auth2.getAuthInstance().signOut();
    },

    /**
     * Toggle Login
     */
    toggleLogin: function() {
      this.isSignedIn ? this.signOut() : this.signIn();
    },

    /**
     * Set callback
     * @param  {Function} fn [function callback]
     */
    setCallback: function(fn) {
      this.callback = fn;
    }
  };

  $rootScope.OAuth2 = $scope.OAuth2 = OAuth2;
})(window, document);
