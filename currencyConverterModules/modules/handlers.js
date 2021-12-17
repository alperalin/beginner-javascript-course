// Imports
import convertRates from './libs/convertRates.js';
import formatCurrency from './utils/formatCurrency.js';

// Handlers
// Error Handler
export const errorHandler = (error) => {
  throw new Error(error);
};

// Input Handler
export const inputHandler = async (
  fromAmount,
  fromCurrency,
  toCurrency,
  toAmount
) => {
  const rawAmount = await convertRates(
    fromAmount.value || 100,
    fromCurrency.value || 'USD',
    toCurrency.value || 'USD'
  ).catch(errorHandler);

  toAmount.textContent = formatCurrency(rawAmount, toCurrency.value || 'USD');
};
