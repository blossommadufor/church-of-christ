import React from "react";
import Select from "react-select";

const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#ffffff" : "#f9fafb",
        borderColor: state.isFocused ? "#4663D8" : "#e5e7eb", // focus:border-light
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.2rem 0.6rem", // py-2.5 px-4 approx
        boxShadow: state.isFocused ? "0 0 0 2px rgba(70, 99, 216, 0.2)" : "none", // focus:ring-light/20
        "&:hover": {
            borderColor: state.isFocused ? "#4663D8" : "#e5e7eb",
        },
        transition: "all 0.2s ease-in-out",
        fontSize: "1rem", // text-base
        width: "100%",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#374151", // text-gray-700
    }),
    placeholder: (base) => ({
        ...base,
        color: "#9ca3af", // text-gray-400
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        zIndex: 50
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "rgba(70, 99, 216, 0.1)" // bg-light/10
            : state.isFocused ? "#f9fafb" : "white",
        color: state.isSelected ? "#26294D" : "#4b5563",
        fontWeight: state.isSelected ? "600" : "400",
        cursor: "pointer",
        padding: "10px 16px",
        "&:active": {
            backgroundColor: "rgba(70, 99, 216, 0.2)"
        }
    })
};

const CustomSelect = (props) => {
    return (
        <Select
            {...props}
            styles={customStyles}
        />
    );
};

export default CustomSelect;
