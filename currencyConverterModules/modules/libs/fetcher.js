// Variables
const endpoint = `https://api.exchangerate.host/latest`;

// Fetcher
const fetchRates = async (baseCurrency = 'USD') => {
  const response = await fetch(`${endpoint}?base=${baseCurrency}`);
  const data = await response.json();
  return data.rates;
};

export default fetchRates;
