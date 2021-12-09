function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error('no slider passed in');

  // Reference to Element
  this.slider = slider;

  // Instance Properties - Select the elements needed for the slider
  this.slides = this.slider.querySelector('.slides');
  this.prevButton = this.slider.querySelector('.goToPrev');
  this.nextButton = this.slider.querySelector('.goToNext');

  // Bind 'this' to the methods
  this.startSlider = this.startSlider.bind(this);
  this.applyClasses = this.applyClasses.bind(this);
  this.move = this.move.bind(this);

  // when this slider created, run the start slider function
  this.startSlider();
}

// Prototype of Slider - Apply Classes To Slides
Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

// Prototype of Slider - Move Slides
Slider.prototype.move = function (direction) {
  // first strip all the classes off the current slides
  const classesToRemove = ['prev', 'current', 'next'];

  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);

  if (direction === 'back') {
    // make a new array of the new values, and destructure them over and into the prev, current and next variables
    [this.prev, this.current, this.next] = [
      // Get the prev slide. If there is none, get the last slide from the entire slider for wrapping
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else if (direction === 'forward') {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      // Get the next slide. If there is none, get the first slide from the entire slider for wrapping
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
};

// Prototype of Slider - Start Slider
Slider.prototype.startSlider = function () {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;

  // call apply classes
  this.applyClasses();

  // button events
  this.prevButton.addEventListener('click', () => this.move('back'));
  this.nextButton.addEventListener('click', () => this.move('forward'));
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));
