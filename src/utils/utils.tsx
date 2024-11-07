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



type Category = {
    id: number;
    name: string;
};

type KeyFeature = {
    id: number;
    name: string;
    value: string[];
};

type Specification = {
    id: number;
    category: string;
    name: string;
    value: string[];
};

type Inventory = {
    id: number;
    quantity: number;
    restock_alert: number;
    last_restocked: string;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    discount_price?: number | null;
    product_code: string;
    brand: string;
    category: Category;
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

