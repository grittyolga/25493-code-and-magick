'use strict';

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;
  this.overlayGallery = document.querySelector('.overlay-gallery');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.numberCurrent = document.querySelector('.preview-number-current');
  this.numberTotal = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
  this.galleryPreview = document.querySelector('.overlay-gallery-preview');

  this.numberTotal.textContent = this.pictures.length;
};

Gallery.prototype = {
  show: function(numberPicture) {
    this.controlLeft.onclick = this.controlLeftClick.bind(this);
    this.controlRight.onclick = this.controlRightClick.bind(this);
    this.galleryClose.onclick = this.hide.bind(this);
    this.overlayGallery.classList.remove('invisible');
    this.setActivePicture(numberPicture);
  },
  hide: function() {
    this.overlayGallery.classList.add('invisible');
    this.controlLeft.onclick = null;
    this.controlRight.onclick = null;
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
  },
  controlLeftClick: function() {
    if (this.activePicture > 0) {
      this.setActivePicture(this.activePicture - 1);
    }
  },
  controlRightClick: function() {
    if (this.activePicture < this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    }
  }
};

module.exports = Gallery;
