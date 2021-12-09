function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  // Reference to element
  this.gallery = gallery;

  // // Instance Properties - Select the elements
  this.images = Array.from(gallery.querySelectorAll('img')); // select only images that belongs to given gallery
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // Bind 'this' to the methods
  this.showImage = this.showImage.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.handleClickOutsideModal = this.handleClickOutsideModal.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);

  // Event listener for image clicks.
  this.images.forEach((image) =>
    image.addEventListener('click', (event) => {
      this.showImage(event.currentTarget);
    })
  );

  // For accessibility. If user press to enter on an image,
  // this listener will call show image for that image.
  this.images.forEach((image) =>
    image.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.showImage(event.currentTarget);
      }
    })
  );

  // modal events
  this.modal.addEventListener('click', this.handleClickOutsideModal);
}

// PROTOTYPES
// Listens clicks that outside of modal
Gallery.prototype.handleClickOutsideModal = function (event) {
  if (event.target === event.currentTarget) this.closeModal(); // if the clicked element and currentTarget equals to modal. Close it.
};

// Listens Escape, Arrow Right and Arrow Left keys.
Gallery.prototype.handleKeyUp = function (event) {
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

// Opens the modal and add event listeners to keys, prev and next button
Gallery.prototype.openModal = function () {
  // first check if the modal is already open
  // if modal opened stop the function
  if (this.modal.matches('.open')) return;

  this.modal.classList.add('open');

  // window events
  window.addEventListener('keyup', this.handleKeyUp);
  // button events
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

// Closes the modal and removes event listeners from keys, prev and next button
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');

  // window events
  window.removeEventListener('keyup', this.handleKeyUp);
  // button events
  this.prevButton.removeEventListener('click', this.showPrevImage);
  this.nextButton.removeEventListener('click', this.showNextImage);
};

// shows the current image, changes modal's content and calls modal open.
Gallery.prototype.showImage = function (imageElement) {
  if (!imageElement) return;

  // update model with image
  this.modal.querySelector('img').src = imageElement.src;
  this.modal.querySelector('h2').textContent = imageElement.title;
  this.modal.querySelector('figure p').textContent =
    imageElement.dataset.description;

  this.currentImage = imageElement;
  this.openModal();
};

// Show the previous image. If current image is the first one, it will loop over
Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

// Show the next image. If current image is the last one, it will loop over
Gallery.prototype.showNextImage = function () {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

// Get galleries from page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
