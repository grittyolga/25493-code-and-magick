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

      var getReviewElement = function(data, container) {
        var element = elementToClone.cloneNode(true);

        var authorImage = new Image(124, 124);

        authorImage.onload = function(evt) {
          var img = element.querySelector('.review-author');
          img.src = evt.target.src;
        };

        authorImage.onerror = function() {
          element.classList.add('review-load-failure');
        };

        authorImage.src = data.author.picture;

        var reviewText = element.querySelector('.review-text');
        reviewText.textContent = data.description;

        var reviewRating = element.querySelector('.review-rating');

        if (data.rating === 2) {
          reviewRating.classList.add('review-rating-two');
        } else if (data.rating === 3) {
          reviewRating.classList.add('review-rating-three');
        } else if (data.rating === 4) {
          reviewRating.classList.add('review-rating-four');
        } else if (data.rating === 5) {
          reviewRating.classList.add('review-rating-five');
        }

        container.appendChild(element);
      };

      receivedReviews.forEach(function(review) {
        getReviewElement(review, reviewsList);
      });

      reviewsFilter.classList.remove('invisible');
    },

    createCallback: function(url, callback) {
      window.callback = callback;

      var scriptEl = document.createElement('script');
      scriptEl.src = url + '?callback=callback';
      document.body.appendChild(scriptEl);
    },

    init: function() {
      this.createCallback('api/reviews', this.receiveReviews);
      reviewsFilter.classList.add('invisible');
    }
  };

  reviews.init();

  return reviews;
})();
