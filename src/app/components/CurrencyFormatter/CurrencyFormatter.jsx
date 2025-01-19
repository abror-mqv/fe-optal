import React, { useEffect, useState } from 'react';
import { formatCurrency } from '@/app/util/formatCurrency';
import { getExchangeRates } from '@/app/util/fetchExchangeRates';

const CurrencyFormatter = ({ amount }) => {
    const [currency, setCurrency] = useState('RUB'); // По умолчанию отображаем в рублях

    useEffect(() => {
        // Загрузка курса валют при старте компонента
        if (typeof window !== 'undefined') {
            const storedCurrency = localStorage.getItem('CURRENCY') || 'RUB'; // Получаем валюту из localStorage или RUB по умолчанию
            setCurrency(storedCurrency);

            // Загружаем курсы валют
            getExchangeRates();
        }

    }, []);

    if (amount === undefined || amount === null) {
        return <span>—</span>; // Если нет значения, выводим дефолтное "—"
    }

    // Используем утилиту для форматирования цены
    const formattedPrice = formatCurrency(amount, currency);

    return <span>{formattedPrice}</span>;
};

export default CurrencyFormatter;