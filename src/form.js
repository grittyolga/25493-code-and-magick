'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReview = document.querySelector('#review-text');
  var formAddReviewButton = document.querySelector('.review-submit');
  var formMark = document.getElementsByName('review-mark');

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
    }
  };
  for (var i = 0; i < formMark.length; i++) {
    var mark = formMark[i];
    mark.onchange = function() {
      if (this.value < 3) {
        formReview.required = true;
      } else {
        formReview.required = false;
      }
    };
  }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
