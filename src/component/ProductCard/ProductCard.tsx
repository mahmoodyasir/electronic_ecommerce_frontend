import { Card, CardContent, CardMedia, Button, Typography, IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { Product } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const handleFavoriteToggle = () => {
        setIsFavorited(!isFavorited);
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
                        // maxWidth: "16rem",
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
                    className="font-bold text-center text-gray-800 line-clamp-2"
                >
                    {product.name}
                </Typography>

                {/* Product Price */}
                <Typography variant="subtitle1" className="text-center text-blue-500 font-semibold mt-2">
                    ${product.price}
                </Typography>


                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="contained"
                        color="primary"
                        className="flex-1 text-nowrap"
                        startIcon={<AddShoppingCart />}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className="ml-2 flex-1"
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
