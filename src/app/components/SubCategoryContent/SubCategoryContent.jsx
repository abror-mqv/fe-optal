'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { BACK_URL } from '@/app/VAR'
import ProductCard from '../product_card/ProductCard'

import '@/app/styles/components/_subcategory.scss'
import Link from 'next/link'
function SubCategoryContent() {
    const { subcatId } = useParams();

    const [products, setProducts] = useState([]);
    const [subCategory, setSubCategory] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([])
    const [parent_category_name, setParent_category_name] = useState("")



    // Запрашиваем первую страницу
    useEffect(() => {
        fetchProducts(`${BACK_URL}/api/factories/subcategory/${subcatId}`);
    }, [subcatId]);

    // Функция загрузки товаров
    const fetchProducts = async (url) => {
        if (!url || loading) return; // Если уже загружается — ничего не делаем

        setLoading(true);
        try {
            const res = await axios.get(url);
            setProducts((prev) => [...prev, ...res.data.products]); // Добавляем новые товары
            setSubCategory(res.data.subcategory_name);
            setParent_category_name(res.data.parent_category_name)
            setSubcategories(res.data.sibling_subcategories)
            setNextPage(res.data.next); // Сохраняем ссылку на следующую страницу
        } catch (err) {
            console.error("Ошибка при загрузке товаров:", err);
        }
        setLoading(false);
    };

    // Обработчик скролла (если пользователь доскроллил до конца)
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                fetchProducts(nextPage);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [nextPage, loading]);

    return (
        <div className='SubCategory'>
            <nav>
                <h1>
                    {parent_category_name}
                </h1>
                <div className='subcatsfeed'>
                    <div className='OneSubcat choosen'>
                        {subCategory}
                    </div>
                    {
                        subcategories.map((subcat, index) => {
                            return (
                                <Link href={`/subcategory/${subcat.id}`} key={index} className='OneSubcat'>
                                    {subcat.subcat_name}
                                </Link>
                            )
                        })
                    }
                </div>
            </nav>

            <div className='feed'>
                {products.map(prod => {
                    return (
                        <ProductCard
                            name={prod.name}
                            id={prod.id}
                            price={prod.price_with_commission}
                            rate={5}
                            image={(prod.color_variations[0]?.image) ? (prod.color_variations[0].image) : null}
                            key={prod.id}
                            color_variations={prod.color_variations}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SubCategoryContent