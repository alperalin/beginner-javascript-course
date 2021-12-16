// Variables
const form = document.querySelector('form');
const fromCurrency = form.from_currency;
const toCurrency = form.to_currency;
const fromAmount = form.from_amount;
const toAmount = form.querySelector('.to_amount');
const endpoint = `https://api.exchangerate.host/latest`;
const ratesByBase = {};
const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

// Fetcher
const fetchRates = async (baseCurrency = 'USD') => {
  const response = await fetch(`${endpoint}?base=${baseCurrency}`);
  const data = await response.json();
  return data.rates;
};

// Convert function
const convertRates = async (amount, fCur, tCur) => {
  // first check if we even have the rates to convert from that currency
  if (!Object.prototype.hasOwnProperty.call(ratesByBase, fCur))
    ratesByBase[fCur] = await fetchRates(fCur);

  // return converted amount
  return amount * ratesByBase[fCur][tCur];
};

// format a Currency to Locale
const formatCurrency = (amount, currency) =>
  Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
  }).format(amount);

// Handlers
const errorHandler = (error) => {
  throw new Error(error);
};

const inputHandler = async () => {
  const rawAmount = await convertRates(
    fromAmount.value || 100,
    fromCurrency.value || 'USD',
    toCurrency.value || 'USD'
  ).catch(errorHandler);

  toAmount.textContent = formatCurrency(rawAmount, toCurrency.value || 'USD');
};

// Option Generator Function
const generateOptions = (options) =>
  Object.entries(options)
    .map(([cCode, cName]) => `<option value="${cCode}">${cName}</option>`)
    .join('');

// Populate options
// This way you call the function one time.
const optionsHTML = generateOptions(currencies);
fromCurrency.innerHTML += optionsHTML;
toCurrency.innerHTML += optionsHTML;

// Event Listener
form.addEventListener('input', inputHandler);
