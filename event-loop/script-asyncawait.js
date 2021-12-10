const button = document.querySelector('.go');
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const handleButton = async (e) => {
  // 1. Change the text to GO when clicked.
  const target = e.currentTarget;
  target.textContent = 'Go!';

  await wait(2000);
  // 2. Make it a circle after 2 seconds
  target.classList.add('circle');

  // 3. Make it red after 0.5s
  await wait(500);
  target.classList.add('red');

  // 4. make it square after 0.25s
  await wait(250);
  target.classList.remove('circle');

  // 5. make it purple after 0.3s
  await wait(300);
  target.classList.remove('red');
  target.classList.add('purple');

  // 6. fade out after 0.5s
  await wait(500);
  target.classList.add('fadeOut');

  // 7. finish
  await wait(500);
  target.classList.remove('purple', 'fadeOut');
  target.textContent = 'Click Me!';
};

// Promise solution to the callback hell!
button.addEventListener('click', handleButton);
