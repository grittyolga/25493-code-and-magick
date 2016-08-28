'use strict';

module.exports = function(url, callback) {
  window.callback = callback;

  var scriptEl = document.createElement('script');
  scriptEl.src = url + '?callback=callback';
  document.body.appendChild(scriptEl);
};
