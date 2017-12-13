angular.module('oAuth2Lit', [
  'modules/OAuth2/OAuth2',
  'src/services/YourService',
  'src/controllers/YourController'
])
  .config(function() {
    var script = document.createElement("script");
    script.setAttribute('onload', 'this.onload=function(){};appInit()');
    script.setAttribute('onreadystatechange', 'if (this.readyState === \'complete\') this.onload()');
    script.setAttribute('src', 'https://apis.google.com/js/api.js');
    document.head.appendChild(script);
  });
