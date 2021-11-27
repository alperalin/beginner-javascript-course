const text = document.querySelector('.text');
const button = document.querySelector('.button');

const obCallback = (payload) => {
  if (payload[0].intersectionRatio) {
    button.disabled = false;
    ob.unobserve(text.lastElementChild);
  }
};

const ob = new IntersectionObserver(obCallback, {
  root: text,
  threshold: 1,
});

ob.observe(text.lastElementChild);
