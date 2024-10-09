import React from 'react'
import '../../styles/components/_feed.scss';
import ProductCard from '../product_card/ProductCard';


const data = [
    {
        name: "Свитер с молнией белый",
        price: "750",
        rate: 4.7,
        image: "https://basket-08.wbbasket.ru/vol1154/part115457/115457422/images/big/1.webp"
    },
    {
        name: "Джинсы бананы широкие серые",
        price: "2 722",
        rate: 4.6,
        image: "https://basket-15.wbbasket.ru/vol2389/part238962/238962254/images/big/1.webp"
    },
    {
        name: "Бомбер оверсайз утепленный демисезон",
        price: "4 317",
        rate: 4.8,
        image: "https://basket-10.wbbasket.ru/vol1545/part154540/154540883/images/big/2.webp"
    },
    {
        name: "Майка спортивная для тренировок",
        price: "1 625",
        rate: 4.0,
        image: "https://basket-14.wbbasket.ru/vol2149/part214960/214960442/images/big/1.webp"
    },
    {
        name: "Свитер с молнией белый",
        price: "750",
        rate: 4.7,
        image: "https://basket-08.wbbasket.ru/vol1154/part115457/115457422/images/big/1.webp"
    },
    {
        name: "Джинсы бананы широкие серые",
        price: "2 722",
        rate: 4.6,
        image: "https://basket-15.wbbasket.ru/vol2389/part238962/238962254/images/big/1.webp"
    },
    {
        name: "Бомбер оверсайз утепленный демисезон",
        price: "4 317",
        rate: 4.8,
        image: "https://basket-10.wbbasket.ru/vol1545/part154540/154540883/images/big/2.webp"
    },
    {
        name: "Майка спортивная для тренировок",
        price: "1 625",
        rate: 4.0,
        image: "https://basket-14.wbbasket.ru/vol2149/part214960/214960442/images/big/1.webp"
    }, {
        name: "Свитер с молнией белый",
        price: "750",
        rate: 4.7,
        image: "https://basket-08.wbbasket.ru/vol1154/part115457/115457422/images/big/1.webp"
    },
    {
        name: "Джинсы бананы широкие серые",
        price: "2 722",
        rate: 4.6,
        image: "https://basket-15.wbbasket.ru/vol2389/part238962/238962254/images/big/1.webp"
    },
    {
        name: "Бомбер оверсайз утепленный демисезон",
        price: "4 317",
        rate: 4.8,
        image: "https://basket-10.wbbasket.ru/vol1545/part154540/154540883/images/big/2.webp"
    },
    {
        name: "Майка спортивная для тренировок",
        price: "1 625",
        rate: 4.0,
        image: "https://basket-14.wbbasket.ru/vol2149/part214960/214960442/images/big/1.webp"
    },
]


function Feed() {
    return (
        <div className='Feed'>
            <div className='list'>
                {data.map(el => {
                    return (
                        <ProductCard
                            name={el.name}
                            price={el.price}
                            rate={el.rate}
                            image={el.image}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default Feed