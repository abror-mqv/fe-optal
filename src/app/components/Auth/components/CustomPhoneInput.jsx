import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./CustomPhoneInput.scss"

const allowedCountries = ["kg", "ru", "kz", "uz", "by", "am"];
const countryDialCodes = {
    kg: "+996",
    ru: "+7",
    kz: "+7",
    uz: "+998",
    by: "+375",
    am: "+374",
};

const localization = {
    kg: "Кыргызстан",
    ru: "Россия",
    kz: "Казахстан",
    uz: "Узбекистан",
    by: "Беларусь",
    am: "Армения",
};

const CustomPhoneInput = ({ value, onChange, default_country }) => {
    return (
        <PhoneInput
            localization={localization}
            country={default_country} // По умолчанию Кыргызстан
            value={value}
            onChange={onChange}
            onlyCountries={allowedCountries}
            countryCodeEditable={false}
            masks={{
                kg: "(...) ..-..-..",
                ru: "(...) ...-..-..",
                kz: "(...) ...-..-..",
                uz: "(..) ...-..-..",
                by: "(..) ...-...",
                am: "(..) ...-...",
            }}
            placeholder="Введите номер"
            inputStyle={{ width: "100%" }}
            className="CustomPhoneInput"
        />
    );
};

export default CustomPhoneInput;
