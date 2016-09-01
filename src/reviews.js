'use strict';
var load = require('./load');
var Review = require('./review');

window.reviews = (function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');

  var reviews = {
    receiveReviews: function(receivedReviews) {
      receivedReviews.forEach(function(review) {
        var reviewElement = new Review(review);
        reviewsList.appendChild(reviewElement.element);
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
