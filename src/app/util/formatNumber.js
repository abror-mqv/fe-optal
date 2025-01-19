import Decimal from 'decimal.js';

export const formatCurrency = (amount, currency = 'USD') => {
  const decimalAmount = new Decimal(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(decimalAmount.toNumber());
};