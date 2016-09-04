'use strict';
var load = require('./load');
var Review = require('./review');

window.reviews = (function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsMore = document.querySelector('.reviews-controls-more');
  var currentPageNumber = 0;
  var pageSize = 3;
  var filter = 'reviews-all';

  var reviews = {
    receiveReviews: function(receivedReviews) {
      receivedReviews.forEach(function(review) {
        var reviewElement = new Review(review);
        reviewsList.appendChild(reviewElement.element);
      });

      reviewsFilter.classList.remove('invisible');
    },

    updateReviews: function() {
      load('api/reviews', {
        from: currentPageNumber * pageSize,
        to: currentPageNumber * pageSize + pageSize,
        filter: filter
      }, this.receiveReviews);
    },

    changeFilter: function(filterID) {
      reviewsList.innerHTML = '';
      filter = filterID;
      currentPageNumber = 0;
      this.updateReviews();
    },

    init: function() {
      this.updateReviews();
      reviewsFilter.classList.add('invisible');
      reviewsMore.classList.remove('invisible');

      var self = this;

      reviewsMore.onclick = function() {
        currentPageNumber++;
        self.updateReviews();
      };

      reviewsFilter.addEventListener('change', function(evt) {
        self.changeFilter(evt.target.id);
      }, true);
    }
  };

  reviews.init();

  return reviews;
})();
