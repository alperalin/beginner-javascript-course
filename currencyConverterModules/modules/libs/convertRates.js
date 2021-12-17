// imports
import fetchRates from './fetcher.js';

// variables
const ratesByBase = {};

// Convert function
const convertRates = async (amount, fCur, tCur) => {
  // first check if we even have the rates to convert from that currency
  if (!Object.prototype.hasOwnProperty.call(ratesByBase, fCur))
    ratesByBase[fCur] = await fetchRates(fCur);

  // return converted amount
  return amount * ratesByBase[fCur][tCur];
};

export default convertRates;
