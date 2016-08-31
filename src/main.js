'use strict';
require('./form');
require('./game');
require('./reviews');
var Gallery = require('./gallery');

(function() {
  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };

  /* обрабатываем галерею */
  var allImages = document.querySelectorAll('.photogallery-image');
  var pictures = [];
  for (var j = 0; j < allImages.length; j++) {
    pictures.push(allImages[j].querySelector('img').src);
  }

  var gallery = new Gallery(pictures);

  for (var i = 0; i < allImages.length; i++) {
    // замыкание, чтобы num была правильная
    (function(num) {
      allImages[num].onclick = function() {
        gallery.show(num);
      };
    })(i);
  }

})();
