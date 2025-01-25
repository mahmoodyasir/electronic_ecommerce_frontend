import { Autocomplete, IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from "react";
import { ITEM_PER_PAGE, MAX_PRICE_LIMIT, Product } from "../../../utils/utils";
import { Context } from "../../../state/Provider";
import { useNavigate } from "react-router-dom";
import { getAllfilteredProduct } from "../../../ApiGateways/products";

const SearchBar = () => {
    const { filterDict, setFilterDict } = useContext(Context);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [filterBy, setFilterBy] = useState<string>('name')
    const [retrieved, setRetrieved] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    let debounceTimeout: number;


    const handleClearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setFilterDict({ ...filterDict, name: "", category: "" });
        setRetrieved(null);
    };

    // console.log("searchResults", searchResults)
    // console.log("filterBy", filterBy)
    // console.log("retrieved", retrieved)
    // console.log("searchQuery", searchQuery)
    // console.log("filters", filters)

    const searchWithDelay = (key: string | undefined) => {
        clearTimeout(debounceTimeout);

        let tempFilter = {
            name: filterBy === "name" ? key as string : filterDict?.name || "",
            category: filterBy === "category" ? key as string : filterDict?.category || "",
            key_features: filterDict.key_features || {},
            min_price: filterDict.min_price || 0,
            max_price: filterDict.max_price || MAX_PRICE_LIMIT,
        };

        debounceTimeout = setTimeout(() => {
            getAllfilteredProduct(1, ITEM_PER_PAGE, tempFilter,
                (data) => {
                    if (key) {
                        setSearchResults([
                            {
                                id: 0,
                                name: String(key),
                                price: 0,
                                images_urls: [],
                                category: '',
                            },
                            ...data?.data
                        ]);

                        setFilterDict({ ...filterDict, [filterBy]: key });
                    } else {
                        setSearchResults(data?.data?.data);
                        setFilterDict({ ...filterDict, [filterBy]: "" });
                    }
                },
                res => console.log(res)
            );
        }, 500);
    };


    return (
        <div className="md:w-4/5 w-full">
            <Autocomplete
                value={retrieved || null}
                options={searchResults || []}
                fullWidth
                freeSolo
                inputValue={searchQuery}
                onInputChange={(_event, newInputValue) => {
                    setSearchQuery(newInputValue);
                    searchWithDelay(newInputValue);
                }}
                onChange={(_event, newValue: any) => {
                    if (newValue?._id || newValue?.id) {
                        navigate(`/product_details/${newValue._id || newValue?.id}`);
                    }
                }}
                autoHighlight
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name + " " + option.category?.name)}
                renderOption={(props, option) => (
                    <li {...props}>
                        <span style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            {option?.id && option?.id !== 0 ? (
                                <img style={{ width: "1.5rem", height: "1.5rem" }} src={option?.image_urls.length > 0 ? option.image_urls[0] : ""} alt="" />
                            ) : (
                                <SearchIcon />
                            )}
                            {option?.name}
                        </span>
                    </li>
                )}
                sx={{
                    "& .MuiAutocomplete-inputRoot": { padding: 0, paddingLeft: "0.5rem", borderRadius: "8px" },
                    "& .MuiAutocomplete-input": { padding: 0, paddingLeft: "0.5rem" },
                    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            searchWithDelay(e.target.value);
                        }}
                        value={searchQuery}
                        placeholder="Search for products..."
                        sx={{ borderRadius: "8px" }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchQuery && (
                                        <IconButton aria-label="clear" onClick={handleClearSearch}>
                                            <ClearIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                                        </IconButton>
                                    )}
                                    <IconButton aria-label="search">
                                        <SearchIcon className="w-6 h-6 text-gray-500 hover:text-blue-500" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Select
                                        variant="standard"
                                        onChange={(e) => {
                                            handleClearSearch();
                                            setFilterBy(e.target.value as string);
                                        }}
                                        value={filterBy}
                                        disableUnderline
                                        sx={{ padding: 0, borderRadius: "8px" }}
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="category">Category</MenuItem>
                                    </Select>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default SearchBar;
