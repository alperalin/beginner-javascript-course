const loaderEl = document.querySelector('.loader');
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

export default getADadJoke;
