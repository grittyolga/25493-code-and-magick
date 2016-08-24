'use strict';

var receiveReviews = function(reviews) {
  window.reviews = reviews;
};

var createCallback = function(url, callback) {
  window.callback = callback;

  var scriptEl = document.createElement('script');
  scriptEl.src = url + '?callback=callback';
  document.body.appendChild(scriptEl);
};

createCallback('api/reviews', receiveReviews);
