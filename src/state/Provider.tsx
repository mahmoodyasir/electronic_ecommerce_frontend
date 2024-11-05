import React, { createContext, useContext, useState } from "react";
import { FilterTypes, MAX_PRICE_LIMIT } from "../utils/utils";


export interface GlobalState {

    searchDrawer: boolean;
    setSearchDrawer: React.Dispatch<React.SetStateAction<boolean>>;


    isProductSerach: boolean;
    setIsProductSearch: React.Dispatch<React.SetStateAction<boolean>>;

    filters: FilterTypes
    setFilters: React.Dispatch<React.SetStateAction<FilterTypes>>;
}

export const Context = createContext<GlobalState>({

    searchDrawer: false,
    setSearchDrawer: () => { },


    isProductSerach: false,
    setIsProductSearch: () => { },

    filters: {
        name: "",
        category: "",
        key_features: [],
        min_price: 0,
        max_price: MAX_PRICE_LIMIT
    },
    setFilters: () => { },

});

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {


    const [searchDrawer, setSearchDrawer] = useState(false);

    const [isProductSerach, setIsProductSearch] = useState(false);

    const [filters, setFilters] = useState<FilterTypes>({
        name: "",
        category: "",
        key_features: [],
        min_price: 0,
        max_price: MAX_PRICE_LIMIT
    })


    const allState: GlobalState = {

        searchDrawer,
        setSearchDrawer,

        isProductSerach,
        setIsProductSearch,

        filters,
        setFilters,

    };

    return (
        <Context.Provider value={allState}>
            {children}
        </Context.Provider>
    )
};

export const useGlobalState = (): GlobalState => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }

    return context;
};