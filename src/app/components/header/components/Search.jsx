import { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useRouter } from "next/router";

const fakeSuggestions = [
    "Футболка",
    "Джинсы",
    "Кроссовки",
    "Куртка",
    "Шапка",
    "Пуховик",
    "Рубашка",
    "Свитер"
];

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim()) {
            window.location.replace("/search/" + encodeURIComponent(query));
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
            <Autocomplete
                freeSolo
                options={fakeSuggestions}
                onInputChange={(event, newValue) => setQuery(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Поиск товаров" variant="outlined" fullWidth />
                )}
                sx={{ width: 300 }}
            />
        </form>
    );
}
