'use client'

import { useEffect, useState } from "react";
import { CircularProgress, Typography, Container } from "@mui/material";
import { useParams } from "next/navigation";
import "./Search.scss"
import { BACK_URL } from "@/app/VAR";
import ProductCard from "@/app/components/product_card/ProductCard";

export default function Search() {
    const { query } = useParams();

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BACK_URL}/api/factories/search?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                console.log(data)
                setResults(data);
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (loading) return <div className="SearchPage"><CircularProgress /></div>
    if (error) return <div className="SearchPage"><Typography color="error">{error}</Typography></div>
    if (!results) return <div className="SearchPage"><CircularProgress /></div>

    return (
        <div className="SearchPage">

            <Typography variant="h4">Результаты поиска: </Typography>
            <div>
                <h3>
                    Боксы:
                </h3>
                {
                    results.boxes.map((box, index) => {
                        return (
                            <div key={index}>
                                {box.factory_name}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <h3>
                    Товары:
                </h3>

                {
                    results.products.map((prod, index) => {
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
                    })
                }
            </div>
            {

            }

        </div>

    );
}
