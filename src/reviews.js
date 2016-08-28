'use strict';
var load = require('./load');
var getReviewElement = require('./review');

window.reviews = (function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');

  var reviews = {

    receiveReviews: function(receivedReviews) {
      receivedReviews.forEach(function(review) {
        getReviewElement(review, reviewsList);
      });

      reviewsFilter.classList.remove('invisible');
    },

    init: function() {
      load('api/reviews', this.receiveReviews);
      reviewsFilter.classList.add('invisible');
    }
  };

  reviews.init();

  return reviews;
})();
