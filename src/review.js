'use strict';

var templateElement = document.querySelector('#review-template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var Review = function(data) {
  this.data = data;
  this.element = elementToClone.cloneNode(true);
  this.reviewQuizYes = this.element.querySelector('.review-quiz-answer-yes');
  this.reviewQuizNo = this.element.querySelector('.review-quiz-answer-no');
  this.generateReview();
};

Review.prototype = {
  generateReview: function() {
    var self = this;

    this.reviewQuizYes.onclick = function() {
      self.reviewQuizYes.classList.add('review-quiz-answer-active');
      self.reviewQuizNo.classList.remove('review-quiz-answer-active');
    };
    this.reviewQuizNo.onclick = function() {
      self.reviewQuizNo.classList.add('review-quiz-answer-active');
      self.reviewQuizYes.classList.remove('review-quiz-answer-active');
    };

    var authorImage = new Image(124, 124);

    authorImage.onload = function(evt) {
      var img = self.element.querySelector('.review-author');
      img.src = evt.target.src;
    };

    authorImage.onerror = function() {
      self.element.classList.add('review-load-failure');
    };

    authorImage.src = this.data.author.picture;

    var reviewText = this.element.querySelector('.review-text');
    reviewText.textContent = this.data.description;

    var reviewRating = this.element.querySelector('.review-rating');

    if (this.data.rating === 2) {
      reviewRating.classList.add('review-rating-two');
    } else if (this.data.rating === 3) {
      reviewRating.classList.add('review-rating-three');
    } else if (this.data.rating === 4) {
      reviewRating.classList.add('review-rating-four');
    } else if (this.data.rating === 5) {
      reviewRating.classList.add('review-rating-five');
    }

  },

  remove: function() {
    this.reviewQuizYes.onclick = null;
    this.reviewQuizNo.onclickk = null;
  },
};

module.exports = Review;
