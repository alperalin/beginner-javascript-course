// imports
import currencies from './data/data.js';
import generateOptions from './modules/utils/generateOptions.js';
import { inputHandler } from './modules/handlers.js';

// Variables
const form = document.querySelector('form');
const fromCurrency = form.from_currency;
const toCurrency = form.to_currency;
const fromAmount = form.from_amount;
const toAmount = form.querySelector('.to_amount');

// Populate options
// This way you call the function one time.
const optionsHTML = generateOptions(currencies);
fromCurrency.innerHTML += optionsHTML;
toCurrency.innerHTML += optionsHTML;

// Event Listener
form.addEventListener('input', () =>
  inputHandler(fromAmount, fromCurrency, toCurrency, toAmount)
);
