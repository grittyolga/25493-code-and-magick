'use strict';

module.exports = function(url, params, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url +
      '?from=' + (params.from || 0) +
      '&to=' + (params.to || Infinity) +
      '&filter=' + (params.filter || 'default')
    );
  xhr.onload = function(evt) {
    var requestObj = evt.target;
    var response = requestObj.response;
    callback(JSON.parse(response));
  };

  xhr.send();
};
