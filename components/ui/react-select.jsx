import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import AsyncSelect, { useAsync } from "react-select/async";
import { ChevronDown } from "lucide-react";
import http from "@/lib/http";
const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "hsl(var(--background))",
        borderColor: "hsl(var(--input))",
        borderRadius: "var(--radius)",
        borderWidth: "1px",
        boxShadow: state.isFocused ? "0 0 0 1px hsl(var(--ring))" : "none",
        minHeight: "1.875rem",
        padding: "0 0.125rem",
        fontSize: "0.875rem",
        "&:hover": {
            borderColor: "hsl(var(--input))"
        }
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "hsl(var(--popover))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
        boxShadow: "0 2px 10px hsl(var(--shadow))",
        zIndex: 50,
        fontSize: "0.875rem"
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? "hsl(var(--accent))"
            : state.isSelected
                ? "hsl(var(--accent))"
                : "transparent",
        color: state.isFocused || state.isSelected
            ? "hsl(var(--accent-foreground))"
            : "hsl(var(--foreground))",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))"
        }
    }),
    singleValue: (base) => ({
        ...base,
        color: "hsl(var(--foreground))"
    }),
    input: (base) => ({
        ...base,
        color: "hsl(var(--foreground))"
    }),
    placeholder: (base) => ({
        ...base,
        color: "hsl(var(--muted-foreground))"
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: "0 0.125rem 0 0",
        color: "hsl(var(--foreground))",
        opacity: 0.5,
        "&:hover": {
            color: "hsl(var(--foreground))",
            opacity: 0.5
        }
    })
};


export const SelectSearchable = ({ options, value, onChange }) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            isSearchable
            styles={customStyles}
            className="w-full"
            components={{ DropdownIndicator }}
        />
    );
}

export const AsyncSelectSearchable = ({ name, value, onChange, apiEndpoint, isMulti = false, placeholder = "Type to search for an item" }) => {

    const loadOptions = async (value) => {
        if (value.length < 3) {
            return null;
        }
        try {
            const { data: { status, data } } = await http.get(apiEndpoint, { params: { name: value } });
            if (status) {
                return data;
            }
        } catch (e) {
            console.log(e);
            return null
        }
    }

    return (
        <AsyncSelect
            loadOptions={loadOptions}
            value={value}
            onChange={onChange}
            isSearchable
            isMulti={isMulti}
            styles={customStyles}
            className="w-full"
            components={{ DropdownIndicator }}
            placeholder={placeholder}
            cacheOptions
            defaultOptions
        />
    );
}


export const SelectMultiCreatable = ({ options, value, onChange, placeholder = "Type and press tab to add items" }) => {
    return (
        <CreatableSelect
            options={options}
            value={value}
            onChange={onChange}
            isMulti
            isSearchable
            styles={customStyles}
            className="w-full"
            components={{ DropdownIndicator: () => null }}
            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            createOptionPosition="first"
            placeholder={placeholder}

        />
    );
}

const DropdownIndicator = () => {
    return (
        <div className="flex items-center justify-center pr-2.5">
            <ChevronDown className="h-4 w-4 text-hsl(var(--border)) opacity-50" />
        </div>
    );
};

