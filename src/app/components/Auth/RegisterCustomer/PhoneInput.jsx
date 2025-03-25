import { useState } from "react";
import { TextField, MenuItem, Select, InputAdornment, Box } from "@mui/material";

const countryCodes = [
    { code: "RU", label: "🇷🇺 +7", value: "+7" },
    { code: "KZ", label: "🇰🇿 +7", value: "+7" },
    { code: "BY", label: "🇧🇾 +375", value: "+375" },
    { code: "UA", label: "🇺🇦 +380", value: "+380" },
    { code: "KG", label: "🇰🇬 +996", value: "+996" },
    { code: "UZ", label: "🇺🇿 +998", value: "+998" },
    { code: "TJ", label: "🇹🇯 +992", value: "+992" },
    { code: "TM", label: "🇹🇲 +993", value: "+993" },
    { code: "AM", label: "🇦🇲 +374", value: "+374" },
    { code: "AZ", label: "🇦🇿 +994", value: "+994" },
    { code: "GE", label: "🇬🇪 +995", value: "+995" },
];

const PhoneInput = ({ value, onChange }) => {
    const [countryCode, setCountryCode] = useState("+7");

    const handleCountryChange = (event) => {
        setCountryCode(event.target.value);
    };

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Select
                value={countryCode}
                onChange={handleCountryChange}
                sx={{ minWidth: 100 }}
            >
                {countryCodes.map((option) => (
                    <MenuItem key={option.code} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                fullWidth
                type="tel"
                value={value}
                onChange={(e) => onChange(countryCode + e.target.value.replace(/\D/g, ""))}
                placeholder="123 456 789"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{countryCode}</InputAdornment>,
                }}
            />
        </Box>
    );
};

export default PhoneInput;
