export const MAX_PRICE_LIMIT = 100000;
export const ITEM_PER_PAGE = 12;



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
    isActive: boolean;
    isHighlighted: boolean;
    key_features: KeyFeature[];
    specifications: Specification[];
    inventory_product: Inventory;
};


export type FilterTypes = {
    name?: string;
    category?: string;
    key_features?: {
        name: string;
        value: string[];
    }[];
    min_price?: number;
    max_price?: number;
};
