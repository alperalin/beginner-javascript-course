// import
import getRandomButtonText from './utils/getRandomButtonText.js';
import getADadJoke from './libs/getADadJoke.js';

// Variables
const textEl = document.querySelector('.joke p');

// Handlers
export const handleError = (err) => {
  console.log(err);
};

export const handleButtonClick = async (event) => {
  const currentText = event.currentTarget.querySelector('.getJoke__text');
  const joke = await getADadJoke().catch(handleError);
  textEl.textContent = joke;
  currentText.innerHTML = getRandomButtonText(currentText.textContent);
};
