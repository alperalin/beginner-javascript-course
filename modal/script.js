const cardButtons = document.querySelectorAll('.card__button');
const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');

const handleButtonClick = (event) => {
  const card = event.currentTarget.closest('.card');
  const cardImageSource = card.querySelector('.card__image').src;
  const cardName = card.querySelector('.card__name').textContent;
  const cardDesc = card.dataset.description;

  modalInner.innerHTML = `
    <img class="modal__image" src=${cardImageSource.replace('250', '600')} />
    <h2 class="modal__title">${cardName}</h2>
    <p class="modal__desc">${cardDesc}</p>  
  `;

  modal.classList.add('open');
};

const closeModal = () => {
  modal.classList.remove('open');
};

const handleModalClose = (event) => {
  // checks if user clicks outside of modal inner
  const isOutside = !event.target.closest('.modal__inner');

  if (isOutside) {
    closeModal();
  }
};

cardButtons.forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});

modal.addEventListener('click', handleModalClose);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
