// import
import buttonText from '../../data/data.js';

// Get A Random Button Text
const getRandomButtonText = (cButtonText) => {
  const randomText = buttonText[Math.floor(Math.random() * buttonText.length)];
  if (cButtonText !== randomText) return randomText;
  getRandomButtonText(cButtonText);
};

export default getRandomButtonText;
