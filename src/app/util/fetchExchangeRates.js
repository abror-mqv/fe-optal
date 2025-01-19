import { BACK_URL } from "../VAR";

export const getExchangeRates = async () => {
    if (typeof window === 'undefined') {
        console.warn('getExchangeRates вызвана на сервере, возврат базового курса.');
        return { RUB: 1 }; // Безопасный возврат на сервере
    }

    const cachedRates = localStorage.getItem('exchangeRates');
    const expirationTime = localStorage.getItem('exchangeRatesExpiration');

    // Если есть валидные данные в кэше
    if (cachedRates && expirationTime && Date.now() < expirationTime) {
        return JSON.parse(cachedRates);
    }

    try {
        const response = await fetch(`${BACK_URL}/api/main/utils/exchange-rates`); // Замените на реальный URL
        if (!response.ok) {
            throw new Error('Ошибка загрузки курсов валют');
        }

        const rates = await response.json();

        // Сохраняем курсы в localStorage (если доступен `window`)
        if (typeof window !== 'undefined') {
            localStorage.setItem('exchangeRates', JSON.stringify(rates));
            localStorage.setItem('exchangeRatesExpiration', Date.now() + 3600 * 1000);
        }

        return rates;
    } catch (error) {
        console.error('Ошибка загрузки курсов валют:', error);
        return { RUB: 1 }; // Возвращаем рубли как базовую валюту по умолчанию
    }
};
