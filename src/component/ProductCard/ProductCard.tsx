import { Card, CardContent, CardMedia, Button, Typography, IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { Product } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { addToCart } from "../../Redux/features/productCartSlice";
import { addToWishlist } from "../../Redux/features/wishlistSlice";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const wishlist = useAppSelector((state) => state.wishlistState.items);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isFavorited = wishlist.some((item) => item.id === product.id);

    const handleFavoriteToggle = () => {
        dispatch(addToWishlist(product));
    };

    const handleMouseEnter = () => {
        if (product.image_urls.length > 1) {
            const nextImageIndex = (currentImageIndex + 1) % product.image_urls.length;
            setCurrentImageIndex(nextImageIndex);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImageIndex(0);
    };

    const handleAddToCart = (product: any, quantity: number) => {
        dispatch(addToCart({ product, quantity }));
    };

    return (
        <Card
            className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col justify-between"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Product Image */}
            <div className="relative group">
                <CardMedia
                    component="img"
                    alt={product.name}
                    image={product.image_urls[currentImageIndex] || '/default-image.jpg'}
                    className="group-hover:opacity-90 transition-opacity duration-200"
                    style={{
                        objectFit: "contain",
                        maxHeight: "15rem",
                    }}
                    sx={{
                        '@media (max-width: 768px)': {
                            maxHeight: '12rem',
                        },
                        '@media (max-width: 480px)': {
                            maxHeight: '10rem',
                        },
                    }}
                />
                <IconButton
                    onClick={handleFavoriteToggle}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                >
                    <FavoriteIcon color={isFavorited ? 'error' : 'inherit'} />
                </IconButton>
            </div>

            {/* Product Details */}
            <CardContent className="p-4">
                {/* Product Name */}
                <Typography
                    variant="h6"
                    component="div"
                    className="font-bold text-center text-gray-800 line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl"
                >
                    {product.name}
                </Typography>

                {/* Product Price */}
                <div>
                    <Typography variant="subtitle1" className="text-center text-blue-500 font-semibold mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                        ${product?.discount_price && product?.discount_price > 0 ? product?.discount_price : product?.price}
                    </Typography>

                    {
                        product?.discount_price && product?.discount_price > 0 &&
                        <Typography className="line-through text-red-500 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                            ${product.price}
                        </Typography>
                    }
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-2 items-stretch mt-4">
                    <Button
                        onClick={() => handleAddToCart(product, 1)}
                        className="flex-1 sm:text-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200 h-full"
                        startIcon={<AddShoppingCart />}
                        fullWidth
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className="flex-1 text-sm h-full"
                        fullWidth
                        onClick={() => {
                            navigate(`/product_details/${product?.id}`);
                        }}
                    >
                        Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
