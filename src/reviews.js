'use strict';

window.reviews = (function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('#review-template');
  var elementToClone;
  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var reviews = {

    receiveReviews: function(receivedReviews) {

      var getReviewElement = require('./review');

      receivedReviews.forEach(function(review) {
        getReviewElement(review, elementToClone, reviewsList);
      });

      reviewsFilter.classList.remove('invisible');
    },

    init: function() {
      var load = require('./load');

      load('api/reviews', this.receiveReviews);
      reviewsFilter.classList.add('invisible');
    }
  };

  reviews.init();

  return reviews;
})();
