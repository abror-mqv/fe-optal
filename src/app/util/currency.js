export const getCurrency = () => {
    // Установим "USD" по умолчанию, если в localStorage ничего нет
    return localStorage.getItem('CURRENCY') || 'USD';
  };
  
export const setCurrency = (currency) => {
    localStorage.setItem('CURRENCY', currency);
};