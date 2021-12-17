// Format a Currency to Locale
const formatCurrency = (amount, currency) =>
  Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
  }).format(amount);

export default formatCurrency;
