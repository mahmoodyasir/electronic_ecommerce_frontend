import { Card, CardMedia, Typography, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector, useAppDispatch } from "../../../Redux/app/hooks";
import { addToWishlist, removeFromWishlist } from "../../../Redux/features/wishlistSlice";
import { addToCart } from "../../../Redux/features/productCartSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../utils/utils";

const MyWishList = () => {
  const wishlist = useAppSelector((state) => state.wishlistState.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product?._id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
        <Typography variant="h4" className="font-bold text-gray-700 mb-4">
          Your Wishlist is Empty
        </Typography>
        <Typography variant="subtitle1" className="text-gray-500 text-center mb-6">
          Explore our catalog and start adding your favorite products to your wishlist!
        </Typography>
        <Button
          variant="contained"
          className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/products/all")}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-8">
      <Typography
        variant="h4"
        className="text-center font-extrabold text-gray-800 mb-8"
      >
        MY WISHLIST
      </Typography>
      <div className="space-y-6">
        {wishlist.map((product) => (
          <Card
            key={product._id}
            className="flex flex-col lg:flex-row items-center bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/3 relative">
              <CardMedia
                component="img"
                image={product.image_urls[0] || "/default-image.jpg"}
                alt={product.name}
                className="w-full h-auto object-contain max-h-60"
              />
              <IconButton
                onClick={() => handleRemoveFromWishlist(product)}
                className="absolute top-4 right-4 text-gray-600 bg-white rounded-full shadow-md hover:text-red-500 hover:shadow-lg transition duration-300"
              >
                <FavoriteIcon color="error" />
              </IconButton>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-2/3 flex flex-col p-6 space-y-4">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 line-clamp-2 text-xl leading-tight"
              >
                {product.name}
              </Typography>
              <div className="space-y-1">
                <Typography className="text-blue-500 font-semibold text-lg">
                  ${product?.discount_price && product?.discount_price > 0 ? product?.discount_price : product?.price}
                </Typography>
                {product?.discount_price && product?.discount_price > 0 && (
                  <Typography className="line-through text-red-500 text-sm">
                    ${product.price}
                  </Typography>
                )}
              </div>
              <Typography className="text-gray-600 text-sm line-clamp-3">
                {product.description}
              </Typography>
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-auto">
                <Button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-800 transform hover:scale-105 transition-transform duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  className="text-indigo-600 border-indigo-600 hover:text-indigo-800 hover:border-indigo-800 px-4 py-2 rounded-lg"
                  onClick={() => navigate(`/product_details/${product._id}`)}
                >
                  Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyWishList;
