'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

import '@/app/styles/components/_category.scss'
import ProductCard from '../product_card/ProductCard';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function CategoryContent() {
    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategoryData();
    }, [categoryId]);

    const fetchCategoryData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACK_URL}/api/factories/category/${categoryId}/`);
            console.log(response.data);

            setCategoryName(response.data.category_name || "");  // Если хочешь передавать название категории
            setSubcategories(response.data.subcategories || []);
            setProducts(response.data.products || []);
            setNextPage(response.data.next);
        } catch (error) {
            console.error("Ошибка при загрузке категории:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreProducts = async () => {
        if (!nextPage || loading) return;

        setLoading(true);
        try {
            const response = await axios.get(nextPage);
            console.log("Дозагрузка товаров:", response.data);

            setProducts(prevProducts => [...prevProducts, ...response.data.products]);
            setNextPage(response.data.next);
        } catch (error) {
            console.error("Ошибка при дозагрузке товаров:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
            !loading
        ) {
            loadMoreProducts();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, nextPage]);
    return (
        <div className='Category'>
            <nav>
                <h1>
                    {categoryName}
                </h1>
                <div className='subcatsfeed'>
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
            <div className='main_feed'>
                <div className='sub_feed'>
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
        </div>
    )
}

export default CategoryContent