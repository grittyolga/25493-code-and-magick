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
  this.galleryPreview = document.querySelector('.overlay-gallery-preview');

  this.numberTotal.textContent = this.pictures.length;
};

Gallery.prototype = {
  show: function(numberPicture) {
    var self = this;
    this.conrolLeft.onclick = function() {
      if (self.activePicture > 0) {
        self.setActivePicture(self.activePicture - 1);
      }

    };
    this.conrolRight.onclick = function() {
      if (self.activePicture < self.pictures.length - 1) {
        self.setActivePicture(self.activePicture + 1);
      }
    };
    this.galleryClose.onclick = function() {
      self.hide();
    };
    this.overlayGallery.classList.remove('invisible');
    this.setActivePicture(numberPicture);
  },
  hide: function() {
    this.overlayGallery.classList.add('invisible');
    this.conrolLeft.onclick = null;
    this.conrolRight.onclick = null;
    this.galleryClose.onclick = null;
  },
  setActivePicture: function(numberPicture) {
    this.activePicture = numberPicture;

    //if this.galleryPreview.removeChild(image);
    var prevImage = this.galleryPreview.querySelector('img');
    if (prevImage !== null) {
      this.galleryPreview.removeChild(prevImage);
    }

    var url = this.pictures[this.activePicture];
    var image = new Image();
    image.src = url;
    this.galleryPreview.appendChild(image);

    this.numberCurrent.textContent = this.activePicture + 1;
  }
};

module.exports = Gallery;
