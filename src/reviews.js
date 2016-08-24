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

  var receiveReviews = function(reviews) {
    window.reviewsList = reviews;

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

      container.appendChild(element);
    };

    window.reviewsList.forEach(function(review) {
      getReviewElement(review, reviewsList);
    });

    reviewsFilter.classList.remove('invisible');
  };

  var createCallback = function(url, callback) {
    window.callback = callback;

    var scriptEl = document.createElement('script');
    scriptEl.src = url + '?callback=callback';
    document.body.appendChild(scriptEl);
  };

  createCallback('api/reviews', receiveReviews);

  reviewsFilter.classList.add('invisible');

})();
