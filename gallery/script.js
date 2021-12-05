function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  // Select the elements
  const images = Array.from(gallery.querySelectorAll('img')); // select only images that belongs to given gallery
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  // Listens clicks that outside of modal
  function handleClickOutsideModal(event) {
    if (event.target === event.currentTarget) closeModal(); // if the clicked element and currentTarget equals to modal. Close it.
  }

  // Listens Escape, Arrow Right and Arrow Left keys.
  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  // Opens the modal and add event listeners to keys, prev and next button
  function openModal() {
    // first check if the modal is already open
    // if modal opened stop the function
    if (modal.matches('.open')) return;

    modal.classList.add('open');

    // window events
    window.addEventListener('keyup', handleKeyUp);
    // button events
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  // Closes the modal and removes event listeners from keys, prev and next button
  function closeModal() {
    modal.classList.remove('open');

    // window events
    window.removeEventListener('keyup', handleKeyUp);
    // button events
    prevButton.removeEventListener('click', showPrevImage);
    nextButton.removeEventListener('click', showNextImage);
  }

  // shows the current image, changes modal's content and calls modal open.
  function showImage(imageElement) {
    if (!imageElement) return;

    // update model with image
    modal.querySelector('img').src = imageElement.src;
    modal.querySelector('h2').textContent = imageElement.title;
    modal.querySelector('figure p').textContent =
      imageElement.dataset.description;

    currentImage = imageElement;
    openModal();
  }

  // Show the previous image. If current image is the first one, it will loop over
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // Show the next image. If current image is the last one, it will loop over
  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  // Event listener for image clicks.
  images.forEach((image) =>
    image.addEventListener('click', (event) => {
      showImage(event.currentTarget);
    })
  );

  // For accessibility. If user press to enter on an image,
  // this listener will call show image for that image.
  images.forEach((image) =>
    image.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        showImage(event.currentTarget);
      }
    })
  );

  // modal events
  modal.addEventListener('click', handleClickOutsideModal);
}

// Get gallerys from page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
