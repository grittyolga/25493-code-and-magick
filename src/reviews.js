'use strict';
var load = require('./load');
var Review = require('./review');

window.reviews = (function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsMore = document.querySelector('.reviews-controls-more');
  var currentPageNumber = 0;
  var pageSize = 3;
  var filter = localStorage.getItem('filter') || 'reviews-all';


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
      localStorage.setItem('filter', filter);
      currentPageNumber = 0;
      this.updateReviews();
    },

    init: function() {
      document.querySelector('#' + filter).checked = true;
      this.updateReviews();
      reviewsFilter.classList.add('invisible');
      reviewsMore.classList.remove('invisible');

      reviewsMore.onclick = this.reviewsMoreClick.bind(this);

      reviewsFilter.addEventListener('change', this.reviewsFilterChange.bind(this), true);
    },

    reviewsMoreClick: function() {
      currentPageNumber++;
      this.updateReviews();
    },
    reviewsFilterChange: function(evt) {
      this.changeFilter(evt.target.id);
    }
  };

  reviews.init();

  return reviews;
})();
