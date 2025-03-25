import { useState } from "react";
import { TextField, Autocomplete, IconButton, InputAdornment } from "@mui/material";
import { redirect } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

const fakeSuggestions = [
    "Футболка Adidas",
    "Кроссовки Nike",
    "Куртка зимняя",
    "Магазин Спорт",
    "Магазин Мода",
    "Рюкзак городской",
];

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CD0000",
                    },

                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#CD0000",
                    },
                },
            },
        },
    },
});

export default function SearchDesktop() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            window.location.replace("/search/" + encodeURIComponent(query));
        }
    };


    return (
        <div className="SearchContainer">
            <ThemeProvider theme={theme}>
                <Autocomplete
                    fullWidth
                    freeSolo
                    options={fakeSuggestions}
                    onInputChange={(event, newValue) => setQuery(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Поиск"
                            variant="outlined"
                            fullWidth
                            onKeyPress={(event) => {
                                if (event.key === "Enter") handleSearch();
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ marginRight: "-30px" }}>
                                        <IconButton onClick={handleSearch}>
                                            <SearchIcon style={{ color: "#fff" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </ThemeProvider>
        </div>
    );
}


