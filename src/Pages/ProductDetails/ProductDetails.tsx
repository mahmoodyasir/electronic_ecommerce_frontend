import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllfilteredProduct, getProductById } from "../../ApiGateways/products";
import { MAX_PRICE_LIMIT, Product, Specification } from "../../utils/utils";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {  Button, ButtonGroup, Chip, Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { addToCart, decreaseCartItem, increaseCartItem } from "../../Redux/features/productCartSlice";


const ProductDetails = () => {

    const { id } = useParams();
    const myCart = useAppSelector((state) => state.cartState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [productData, setProductData] = useState<Product>();
    const [mainImage, setMainImage] = useState<string>("");
    const [relatedProduct, setRelatedProduct] = useState<Product[]>();


    useEffect(() => {
        getProductById(Number(id),
            (data) => {
                setProductData(data);
                setMainImage(data.image_urls[0]);
            },
            (res) => console.log(res)
        );
    }, [id]);


    useEffect(() => {
        const filter = {
            name: "",
            category: productData?.category || "",
            key_features: {},
            min_price: 0,
            max_price: MAX_PRICE_LIMIT
        };

        getAllfilteredProduct(1, 4, filter,
            (data) => {
                setRelatedProduct(data?.data);
            },
            res => console.log(res)
        )
    }, [productData])

    if (!productData) {
        return <Typography>Loading...</Typography>;
    }

    const handleImageHover = (image: string) => {
        setMainImage(image);
    };


    const groupSpecificationsByCategory = (specs: Specification[]) => {
        const groupedSpecs: { [key: string]: Specification[] } = {};
        specs.forEach(spec => {
            if (!groupedSpecs[spec.category]) {
                groupedSpecs[spec.category] = [];
            }
            groupedSpecs[spec.category].push(spec);
        });
        return groupedSpecs;
    };


    const groupedSpecs = groupSpecificationsByCategory(productData.specifications);


    const handleAddToCart = (product: any, quantity: number) => {
        dispatch(addToCart({ product, quantity }));
    };

    const handleIncreaseQuantity = (productId: string | number, product: any, quantity: number) => {
        if (myCart[String(productId)]?.quantity < 1 || myCart[String(productId)]?.quantity === undefined) {
            dispatch(addToCart({ product, quantity }));
        }
        else {
            dispatch(increaseCartItem(String(productId)));
        }

    };

    const handleDecreaseQuantity = (productId: string | number) => {
        dispatch(decreaseCartItem(String(productId)));
    };

    return (
        <div className="container mx-auto p-6">

            {/* Product Image and Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column: Product Image */}
                <div className="flex flex-col items-center">
                    <div className="w-full flex justify-center rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={mainImage}
                            alt={productData.name}
                            className=" object-contain h-[12rem] sm:h-[15rem] md:h-[20rem] lg:h-[30rem]"
                        />
                    </div>
                    {/* Thumbnail Images */}
                    <div className="flex mt-4 space-x-2">
                        {productData.image_urls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Thumbnail ${index}`}
                                onMouseEnter={() => handleImageHover(url)}
                                className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer ${mainImage === url ? "border-indigo-600" : "border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column: Product Information */}
                <div>
                    <div className="flex flex-col justify-between space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">{productData.name}</h1>

                        {/* Badges for Brand, Category, and Product Code */}
                        <div className="flex flex-wrap gap-4">
                            {/* Brand */}
                            <Chip
                                label={<span><strong>Brand:</strong> {productData.brand}</span>}
                                color="primary"
                            />

                            {/* Category */}
                            <Chip
                                label={<span><strong>Category:</strong> {productData.category}</span>}
                                color="secondary"
                            />

                            {/* Product Code */}
                            <Chip
                                label={<span><strong>Product Code:</strong> {productData.product_code}</span>}
                                color="error"
                            />
                        </div>

                        {/* Pricing Section */}
                        <div className="flex items-baseline space-x-4">
                            <span className="text-3xl font-bold text-indigo-600">
                                ${productData?.discount_price && productData?.discount_price > 0 ? productData?.discount_price : productData?.price}
                            </span>
                            {
                                productData?.discount_price && productData?.discount_price > 0 &&
                                <span className="text-xl line-through text-gray-500">
                                    ${productData.price}
                                </span>
                            }
                        </div>

                        {/* Key Features */}
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-gray-800">Key Features</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {productData.key_features.map((feature, index) => (
                                    <li key={index} className="text-gray-700">
                                        <strong>{feature.name}:</strong> {feature.value.join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center space-x-4">
                            <ButtonGroup className=" border-black border-[1px]" color="secondary" aria-label="Medium-sized button group">
                                <Button
                                    onClick={() => handleDecreaseQuantity(productData?.id)}
                                    className=' border-l-0 border-t-0 border-b-0 border-r-[1px] border-black text-red-500 hover:bg-red-400 hover:text-white'>
                                    <RemoveIcon />
                                </Button>
                                <Button className='border-0 text-black font-bold' disabled>
                                    {myCart[String(id)]?.quantity || 0}
                                </Button>
                                <Button
                                    onClick={() => handleIncreaseQuantity(Number(productData?.id), productData, 1)}
                                    className='border-l-[1px] border-t-0 border-b-0 border-r-0 border-black text-green-500 hover:bg-green-400 hover:text-white'>
                                    <AddIcon />
                                </Button>
                            </ButtonGroup>
                            <Button onClick={() => { handleAddToCart(productData, 1) }} className="px-4 py-2 bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition duration-200">
                                Add to Cart
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            <Divider className="mt-4 mb-2 h-6"/>

            {/* Specifications Section */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="md:col-span-2">
                    <div className="shadow-2xl px-5 py-8 rounded-lg">
                        <Typography className="text-2xl font-semibold text-gray-900 mb-4">Specifications</Typography>
                        <div className="flex flex-col gap-6">
                            {Object.keys(groupedSpecs).map((category, index) => (
                                <div
                                    key={index}
                                    className="bg-indigo-50 p-4 rounded-md shadow-md space-y-2 border-l-4 border-indigo-600"
                                >
                                    <h3 className="text-lg font-bold text-indigo-800">{category}</h3>
                                    {groupedSpecs[category].map((spec, idx) => (
                                        <p key={idx} className="text-sm text-gray-600">
                                            <strong>{spec.name}:</strong> {spec.value.join(", ")}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div >
                    <section>
                        <Typography className="text-xl font-semibold text-gray-900 mb-4">Related Products</Typography>
                        {
                            relatedProduct?.map((item, i) => (
                                <>
                                    <div key={i} className="flex items-center border border-gray-300 rounded-lg shadow-md p-4 mb-4 w-full">

                                        {/* Product Image */}
                                        <img
                                            src={item?.image_urls[0]}
                                            alt={item?.name}
                                            className="h-20 w-20 object-cover rounded-lg mr-4"
                                        />

                                        {/* Product Details */}
                                        <div className="flex-grow min-w-0">
                                            {/* Product Name */}
                                            <Typography className="text-sm lg:text-lg font-semibold text-gray-700 break-words">
                                                {item?.name}
                                            </Typography>

                                            {/* Product Prices */}
                                            <div className="flex flex-wrap items-center space-x-2 mt-1">
                                                {item?.discount_price && item?.discount_price > 0 && (
                                                    <span className="text-green-500 font-bold">
                                                        ${item?.discount_price}
                                                    </span>
                                                )}
                                                <span className={`text-gray-500 ${item?.discount_price && item?.discount_price > 0 ? 'line-through' : 'text-green-500'}`}>
                                                    ${item?.price}
                                                </span>
                                            </div>

                                            {/* Details Button */}
                                            <Button
                                                className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition duration-200"
                                                onClick={() => { navigate(`/product_details/${item?.id}`) }}
                                            >
                                                Details
                                            </Button>
                                        </div>
                                    </div>

                                </>
                            ))
                        }
                    </section>
                </div>

            </div>

            {/* Description Section */}
            <div className="mt-10">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{productData.description}</p>
            </div>
        </div>
    )
}

export default ProductDetails;
