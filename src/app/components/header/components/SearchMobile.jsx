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
                    sx={{ width: "320px" }}
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
                                    <InputAdornment position="end" sx={{ position: "absolute", right: "0", backgroundColor: "#CD0000", borderRadius: "0px 5px 5px 0px", border: "0", fontSize: "20px", padding: "27.8px 10px", marginTop: "1px" }}>
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


