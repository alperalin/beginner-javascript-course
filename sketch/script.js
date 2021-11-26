// variables
const shakeButton = document.querySelector('.sketch__shake-button');
const canvas = document.querySelector('#sketchCanvas');
const ctx = canvas.getContext('2d');
const { width, height } = canvas; // canvas dimensions
let x = Math.floor(Math.random() * width + 1);
let y = Math.floor(Math.random() * height + 1);
let hue = Math.floor(Math.random() * 360 + 1);
const MOVE_AMOUNT = 15;

// canvas settings for drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.stroke();

// move line function
const moveLine = (key) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  hue += 1;

  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;

    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;

    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;

    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;

    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.stroke();
};

// handle shake button
const handleShakeButton = () => {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
};

window.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key.includes('Arrow')) {
    event.preventDefault();
    moveLine(key);
  }
});

shakeButton.addEventListener('click', handleShakeButton);
