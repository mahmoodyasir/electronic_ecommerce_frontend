import { Cancel, RemoveOutlined, AddOutlined } from "@mui/icons-material";
import { Typography, IconButton, ButtonGroup, Button, Dialog, DialogTitle, DialogActions, Divider } from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { increaseCartItem, decreaseCartItem, removeFromCart, CartState } from "../../Redux/features/productCartSlice";

type Props = {
    header?: JSX.Element;
    cart: CartState;
    disableItemUpdate?: boolean;
    footerElement?: JSX.Element;
};

function OrderSummary(props: Props) {
    const { header, cart, disableItemUpdate, footerElement } = props;
    const [open, setOpen] = useState(false);
    const [currentKey, setCurrentKey] = useState<string>("");
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (productId: string) => {
        dispatch(increaseCartItem(productId));
    };

    const handleDecreaseQuantity = (productId: string) => {
        dispatch(decreaseCartItem(productId));
    };

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <main className="bg-white rounded-lg shadow-lg">
            {header}

            {/* Confirm Delete Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to remove this item?"}
                </DialogTitle>
                <DialogActions>
                    <Button variant="outlined" color="success" onClick={() => {
                        handleRemoveFromCart(currentKey);
                        setOpen(false);
                    }}>
                        Proceed
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Cart Items */}
            <section className="p-4">
                {Object.entries(cart).map(([key, value], index) => (
                    <Fragment key={index}>
                        <section className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                            {!disableItemUpdate && (
                                <IconButton
                                    onClick={() => {
                                        setCurrentKey(key);
                                        setOpen(true);
                                    }}
                                >
                                    <Cancel fontSize="large" />
                                </IconButton>
                            )}

                            {/* Product Image */}
                            <article className="w-24 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={value.product.image_urls[0] || "https://i.ibb.co.com/8xBYtXv/no-image-available.png"}
                                    alt={value.product.name}
                                    style={{ objectFit: "contain" }}
                                />
                            </article>

                            {/* Product Details */}
                            <article className="ml-4 w-full">
                                <Typography className="font-semibold text-lg">
                                    {value.product.name}
                                </Typography>
                                <Typography className="text-sm">
                                    <b>Price:</b> ৳{value?.product?.discount_price && value?.product?.discount_price > 0 ? value?.product?.discount_price : value?.product?.price}
                                </Typography>
                                <Typography className="text-sm">
                                    <b>Total:</b> ৳{value.total_price}
                                </Typography>

                                {!disableItemUpdate && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Typography>Qty:</Typography>
                                        <ButtonGroup variant="outlined">
                                            <IconButton onClick={() => handleDecreaseQuantity(key)}>
                                                <RemoveOutlined />
                                            </IconButton>
                                            <Button disabled className="w-12 text-black">
                                                {cart[key]?.quantity || 0}
                                            </Button>
                                            <IconButton onClick={() => handleIncreaseQuantity(key)}>
                                                <AddOutlined />
                                            </IconButton>
                                        </ButtonGroup>
                                    </div>
                                )}
                            </article>
                        </section>

                        <Divider className="my-4" />
                    </Fragment>
                ))}
            </section>
            {footerElement}
        </main>
    );
}

export default OrderSummary;
