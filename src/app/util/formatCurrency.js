import Decimal from 'decimal.js';

export const formatCurrency = (amount, currency = 'RUB') => {
  if (amount === undefined || amount === null) {
    throw new Error('Amount is required and must be a valid number');
  }

  // Безопасно получаем курсы валют
  let rates = { KGS: 1 }; // Значение по умолчанию
  if (typeof window !== 'undefined') {
    const cachedRates = localStorage.getItem('exchangeRates');
    rates = cachedRates ? JSON.parse(cachedRates) : rates;
  }

  // Берём курс для указанной валюты
  const rate = rates[currency] || 1; // Если курс не найден, используем значение по умолчанию

  // Конвертируем сумму в нужную валюту
  const convertedAmount = new Decimal(amount).div(rate);

  // Форматируем сумму с разделением на тысячи
  const formattedAmount = convertedAmount
    .toFixed(2) // Два знака после запятой
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Разделяем тысячные разряды

  // Символы валют
  const currencySymbolMap = {
    RUB: 'р.',
    USD: '$',
    EUR: '€',
    KGS: 'сом',
    KZT: 'тнг.',
    UZS: 'сум',
  };

  const currencySymbol = currencySymbolMap[currency] || currency; // Если валюты нет в мапе, возвращаем код валюты

  return `${formattedAmount} ${currencySymbol}`;
};
