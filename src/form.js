'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReview = document.querySelector('#review-text');
  var formAddReviewButton = document.querySelector('.review-submit');
  var formMark = document.getElementsByName('review-mark');
  var formName = document.querySelector('#review-name');
  var formNameLink = document.querySelector('.review-fields-name');
  var formTextLink = document.querySelector('.review-fields-text');
  var formReviewFields = document.querySelector('.review-fields');
  var stars = 3;
  var browserCookies = require('browser-cookies');

  var form = {
    onClose: null,
    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }

      var today = new Date();
      var graceHopper = new Date(today.getFullYear(), 11, 9);
      var cookieDays = (today - graceHopper) / 1000 / 60 / 60 / 24;
      if (cookieDays < 0) {
        graceHopper.setFullYear(today.getFullYear() - 1);
        cookieDays = (today - graceHopper) / 1000 / 60 / 60 / 24;
      }

      cookieDays = Math.floor(cookieDays);
      browserCookies.set('review-mark', stars, {expires: cookieDays});
      browserCookies.set('review-name', formName.value, {expires: cookieDays});
    },

    validate: function() {
      var reviewValid = this.isReviewValid();
      var nameValid = this.isNameValid();

      if (reviewValid && nameValid) {
        formAddReviewButton.disabled = false;
        formReviewFields.style.display = 'none';
      } else {
        formAddReviewButton.disabled = true;
        formReviewFields.style.display = '';
      }

      if (reviewValid) {
        formTextLink.style.display = 'none';
      } else {
        formTextLink.style.display = '';
      }

      if (nameValid) {
        formNameLink.style.display = 'none';
      } else {
        formNameLink.style.display = '';
      }
    },

    isReviewValid: function() {
      if (stars < 3 && formReview.value.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    isNameValid: function() {
      if (formName.value.length === 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  stars = browserCookies.get('review-mark') || 3;
  formMark[formMark.length - stars].checked = true;
  formName.value = browserCookies.get('review-name') || '';

  form.validate();

  for (var i = 0; i < formMark.length; i++) {
    var mark = formMark[i];
    mark.onchange = function() {
      stars = this.value;
      form.validate();
    };
  }

  formName.onkeyup = function() {
    form.validate();
  };

  formReview.onkeyup = function() {
    form.validate();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
