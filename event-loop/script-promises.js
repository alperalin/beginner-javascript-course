const button = document.querySelector('.go');

// Promise solution to the callback hell!
button.addEventListener('click', (e) => {
  // 1. Change the text to GO when clicked.
  const target = e.currentTarget;
  target.textContent = 'Go!';

  const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

  wait(2000)
    .then(() => {
      // 2. Make it a circle after 2 seconds
      target.classList.add('circle');

      // 3. Make it red after 0.5s
      return wait(500);
    })
    .then(() => {
      target.classList.add('red');

      // 4. make it square after 0.25s
      return wait(250);
    })
    .then(() => {
      target.classList.remove('circle');

      // 5. make it purple after 0.3s
      return wait(300);
    })
    .then(() => {
      target.classList.remove('red');
      target.classList.add('purple');

      // 6. fade out after 0.5s
      return wait(500);
    })
    .then(() => {
      target.classList.add('fadeOut');

      // 7. finish
      return wait(500);
    })
    .then(() => {
      target.classList.remove('purple', 'fadeOut');
      target.textContent = 'Click Me!';
    });
});
