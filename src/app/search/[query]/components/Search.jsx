'use client'

import { useEffect, useState } from "react";
import { CircularProgress, Typography, Container } from "@mui/material";
import { useParams } from "next/navigation";
import "./Search.scss"
import { BACK_URL } from "@/app/VAR";
import ProductCard from "@/app/components/product_card/ProductCard";
import SuggestedProductsFeed from "./SuggestedProductsFeed";
import MatchedProductsFeed from "./MatchedProductsFeed";
import MatchedBoxesFeed from "./MatchedBoxesFeed";

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


            <h2><span style={{ color: "#CD0000" }}>{decodeURI(query)}</span> - Результаты поиска</h2>
            {
                results.has_matched_boxes ? <MatchedBoxesFeed /> : <>Нет совпадающих боксов</>
            }
            {
                results.has_matched_products ? <MatchedProductsFeed products={results.matched_products} /> : <>Нет совпадающих товаров</>
            }
            <SuggestedProductsFeed products={results.random_products} />
        </div>

    );
}
