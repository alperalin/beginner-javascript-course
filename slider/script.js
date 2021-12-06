function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error('no slider passed in');

  // variables to track slides
  let current;
  let prev;
  let next;

  // select the elements needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // apply classes to slides
  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  // move slides
  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];

    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);

    if (direction === 'back') {
      // make a new array of the new values, and destructure them over and into the prev, current and next variables
      [prev, current, next] = [
        // Get the prev slide. If there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else if (direction === 'forward') {
      [prev, current, next] = [
        current,
        next,
        // Get the next slide. If there is none, get the first slide from the entire slider for wrapping
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  // start slider
  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;

    // call apply classes
    applyClasses();

    // button events
    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', () => move('forward'));
  }

  // when this slider created, run the start slider function
  startSlider();
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
