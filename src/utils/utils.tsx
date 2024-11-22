import { AlertColor } from "@mui/material";

export const MAX_PRICE_LIMIT = 1000000;
export const ITEM_PER_PAGE = 12;

export const stringToColor = (str: string): string => {
    // Generate hash code from string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate color code from hash code
    const color = Math.floor(Math.abs(hash) % 16777215).toString(16);
    return "#" + "0".repeat(6 - color.length) + color;
};

export const convertToTitle = (str: string) => {
    const result = str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return result;
}


// type Category = {
//     id: number;
//     name: string;
// };

export type KeyFeature = {
    id: number;
    name: string;
    value: string[];
};

export type Specification = {
    id: number;
    category: string;
    name: string;
    value: string[];
};

export type Inventory = {
    id: number;
    quantity: number;
    restock_alert: number;
    last_restocked: string;
};

export type Product = {
    id: number | string;
    name: string;
    price: number;
    discount_price?: number | null;
    product_code: string;
    brand: string;
    category: string;
    description: string;
    image_urls: string[];
    images?: [];
    isActive: boolean;
    isHighlighted: boolean;
    key_features: KeyFeature[];
    specifications: Specification[];
    inventory_product: Inventory;
};


export type FilterTypes = {
    name?: string;
    category?: string;
    key_features?: Record<string, string[]>;
    min_price?: number;
    max_price?: number;
};

export type CountryCode = 'BD' | 'CA';

export type User = {
    id: number | string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    countryCode: string | null;
    countryInitial: CountryCode | undefined;
    address: string | null;
    image_url: string | null;
    is_staff: boolean;
    is_superuser: boolean;
};


export type snackBarDataType = {
    isActive: boolean;
    verticalPosition: any;
    horizontalPosition: any;
    message: string;
    alertType: AlertColor;
}


export type UserData = {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    countryCode: string;
    countryInitial: CountryCode;
    address: string;
    image_url?: string | null;
}