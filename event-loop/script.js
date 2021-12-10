const button = document.querySelector('.go');

// This Called Callback HELL!
button.addEventListener('click', (e) => {
  // 1. Change the text to GO when clicked.
  const target = e.currentTarget;
  target.textContent = 'Go!';

  // 2. Make it a circle after 2 seconds
  setTimeout(() => {
    target.classList.add('circle');

    // 3. Make it red after 0.5s
    setTimeout(() => {
      target.classList.add('red');

      // 4. make it square after 0.25s
      setTimeout(() => {
        target.classList.remove('circle');

        // 5. make it purple after 0.3s
        setTimeout(() => {
          target.classList.remove('red');
          target.classList.add('purple');

          // 6. fade out after 0.5s
          setTimeout(() => {
            target.classList.add('fadeOut');

            // 7. finish
            setTimeout(() => {
              target.classList.remove('purple', 'fadeOut');
              target.textContent = 'Click Me!';
            }, 500);
          }, 500);
        }, 300);
      }, 250);
    }, 500);
  }, 2000);
});
