'use strict';

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;
  this.overlayGallery = document.querySelector('.overlay-gallery');
  this.conrolLeft = document.querySelector('.overlay-gallery-control-left');
  this.conrolRight = document.querySelector('.overlay-gallery-control-right');
  this.numberCurrent = document.querySelector('.preview-number-current');
  this.numberTotal = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
};

Gallery.prototype = {
  show: function(numberPicture) {
    console.log(numberPicture);
  },
};

module.exports = Gallery;
