import { Autocomplete, IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from "react";
import { ITEM_PER_PAGE, MAX_PRICE_LIMIT, Product } from "../../../utils/utils";
import { Context } from "../../../state/Provider";
// import { getAllProduct } from "../../../ApiGateways/product";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { filters, setFilters } = useContext(Context);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [filterBy, setFilterBy] = useState<string>('name')
    const [retrieved, setRetrieved] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    let debounceTimeout: number;


    const handleClearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setFilters({ ...filters, name: "" });
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
            name: filterBy === "name" ? key as string : filters?.name || "",
            category: filterBy === "category" ? key as string : filters?.category || "",
            key_features: filters.key_features || [],
            min_price: filters.min_price || 0,
            max_price: filters.max_price || MAX_PRICE_LIMIT,
        };

        debounceTimeout = setTimeout(() => {
            //   getAllProduct(1, ITEM_PER_PAGE, true, tempFilter,
            //     (data) => {
            //       if (key) {
            //         setSearchResults([
            //           {
            //             _id: '',
            //             name: String(key),
            //             price: 0,
            //             description: '',
            //             images: [],
            //             stock_quantity: 0,
            //             category: '',
            //             createdAt: '',
            //             updatedAt: '',
            //           },
            //           ...data?.data?.data
            //         ]);

            //         setFilters({ ...filters, name: key });
            //       } else {
            //         setSearchResults(data?.data?.data);
            //         setFilters({ ...filters, name: "" });
            //       }
            //     },
            //     res => console.log(res)
            //   );
        }, 500);
    };


   

    return (
        <div className="md:w-4/5 w-full">
            <Autocomplete
                value={retrieved}
                options={searchResults}
                fullWidth
                freeSolo
                inputValue={searchQuery}
                onInputChange={(_event, newInputValue) => {
                    setSearchQuery(newInputValue); 
                    searchWithDelay(newInputValue);
                }}
                onChange={(_event, newValue: any) => {
                    setRetrieved(newValue?.name);
                    if (newValue?._id) {
                        navigate(`/product_details/${newValue._id}`);
                    }
                }}
                autoHighlight
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                renderOption={(props, option) => (
                    <li {...props}>
                        <span className="flex gap-4 items-center">
                            {option?._id ? (
                                <img className="w-6 h-6" src={option?.images.length > 0 ? option.images[0] : ""} alt="" />
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
                                        onChange={(e) => setFilterBy(e.target.value as string)}
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
