'use strict';

module.exports = function(data, elementToClone, container) {

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
