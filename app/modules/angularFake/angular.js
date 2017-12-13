var requires = [], i = 0;
var angular = {

  fakeFactorysBuilder: function(name, requires) {
    /*eslint-disable */
    var fn = requires[requires.length - 1];
    requires.splice(requires.length-1, 1);
    eval('document[name] = (fn)(' + requires.join(', document.').replace('$scope', 'document') + ')');
    /*eslint-enable */
  },

  /**
   * [description]
   * @param  {[type]} name     [description]
   * @param  {[type]} requires [description]
   * @return {[type]}          [description]
   */
  module: function(name, requires) {
    var fakeConfigsBuilder = function(fn) {
      var runFn = function() {
        if (i < requires.length) {
          setTimeout(runFn, 500);
        } else {
          fn();
        }
      };
      runFn();
    };

    if (requires) {
      var importFile = function() {
        if (i < requires.length) {
          var script = document.createElement("script");
          script.setAttribute('src', 'app/' + requires[i] + '.js');
          document.head.appendChild(script);
          i++
          setTimeout(importFile, 500);
        }
      };
      importFile();
    }

    return {
      run: function(fn) {
        fakeConfigsBuilder(fn);
      },
      config: function(fn) {
        fakeConfigsBuilder(fn);
      }
    }
  },

  /**
   * [description]
   * @param  {[type]}   name     [description]
   * @param  {[type]}   requires [description]
   * @param  {Function} fn       [description]
   * @return {[type]}            [description]
   */
  controller: function(name, requires) {
    angular.fakeFactorysBuilder(name, requires);
  },

  /**
   * [description]
   * @param  {[type]}   name     [description]
   * @param  {[type]}   requires [description]
   * @param  {Function} fn       [description]
   * @return {[type]}            [description]
   */
  service: function(name, requires) {
    angular.fakeFactorysBuilder(name, requires);
  },

  /**
   * [description]
   * @param  {[type]}   name     [description]
   * @param  {[type]}   requires [description]
   * @param  {Function} fn       [description]
   * @return {[type]}            [description]
   */
  factory: function(name, requires) {
    angular.fakeFactorysBuilder(name, requires);
  }
}
