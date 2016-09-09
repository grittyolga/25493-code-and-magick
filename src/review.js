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

    this.reviewQuizYes.onclick = this.reviewQuizYesClick.bind(this);
    this.reviewQuizNo.onclick = this.reviewQuizNoClick.bind(this);

    var authorImage = new Image(124, 124);

    authorImage.onload = this.authorImageLoad.bind(this);

    authorImage.onerror = this.authorImageError.bind(this);

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

  reviewQuizYesClick: function() {
    this.reviewQuizYes.classList.add('review-quiz-answer-active');
    this.reviewQuizNo.classList.remove('review-quiz-answer-active');
  },

  reviewQuizNoClick: function() {
    this.reviewQuizNo.classList.add('review-quiz-answer-active');
    this.reviewQuizYes.classList.remove('review-quiz-answer-active');
  },

  authorImageLoad: function(evt) {
    var img = this.element.querySelector('.review-author');
    img.src = evt.target.src;
  },

  authorImageError: function() {
    this.element.classList.add('review-load-failure');
  }
};

module.exports = Review;
