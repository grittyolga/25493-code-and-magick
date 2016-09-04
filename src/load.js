'use strict';

module.exports = function(url, params, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url +
      '?from=' + params.from +
      '&to=' + params.to +
      '&filter=' + params.filter
    );
  xhr.onload = function(evt) {
    var requestObj = evt.target;
    var response = requestObj.response;
    callback(JSON.parse(response));
  };

  xhr.send();
};
