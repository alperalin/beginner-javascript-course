const button = document.querySelector('.getJoke');
const textEl = document.querySelector('.joke p');
const loaderEl = document.querySelector('.loader');
const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];
const endpoint = 'https://icanhazdadjoke.com/';

const getADadJoke = async () => {
  loaderEl.classList.add('show');
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  loaderEl.classList.remove('show');
  return data.joke;
};

const handleError = (err) => {
  console.log(err);
};

const getRandomButtonText = (cButtonText) => {
  const randomText = buttonText[Math.floor(Math.random() * buttonText.length)];
  if (cButtonText !== randomText) return randomText;
  getRandomButtonText(cButtonText);
};

const handleButtonClick = async (event) => {
  const currentText = event.currentTarget.querySelector('.getJoke__text');
  const joke = await getADadJoke().catch(handleError);
  textEl.textContent = joke;
  currentText.innerHTML = getRandomButtonText(currentText.textContent);
};

button.addEventListener('click', handleButtonClick);
