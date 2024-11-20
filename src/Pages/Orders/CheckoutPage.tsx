import React, { useEffect, useState } from "react";
import {
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    Button,
    FormGroup,
    Checkbox,
    TextField,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import BasicInfo from "../../component/BasicInfo/BasicInfo";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { snackBarDataType, UserData } from "../../utils/utils";
import OrderSummary from "../../component/OrderSummary/OrderSummary";
import all_payment_img from '../../static/images/all_payment_mediums.png'
import { createOrder } from "../../ApiGateways/orders";
import { clearCart } from "../../Redux/features/productCartSlice";
import GlobalSnackbar from "../../component/GlobalSnackbar/GlobalSnackbar";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const user = useAppSelector((state) => state.userState.user);
    const myCart = useAppSelector((state) => state.cartState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        email: user?.email || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        phone_number: user?.phone_number || "",
        countryCode: user?.countryCode || "+880",
        countryInitial: user?.countryInitial || "BD",
        address: user?.address || "",
        image_url: user?.image_url || null,
    });

    const [paymentMethod, setPaymentMethod] = useState<string>("online");
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState<boolean>(false)
    const [shipping, setShipping] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [snackbarState, setSnackbarState] = useState<snackBarDataType>({
        isActive: false,
        verticalPosition: "top",
        horizontalPosition: "center",
        message: "",
        alertType: "success",
    });

    useEffect(() => {
        const newTotal = Object.keys(myCart).reduce((total, key) => {
            const price = myCart[key]?.total_price || 0;
            return total + price;
        }, 0);
        setTotalPrice(newTotal);
    }, [myCart]);

    const footerElement = (
        <section className="flex flex-col sm:flex-row justify-between items-center bg-violet-600 text-white py-4 px-6 rounded-lg mt-4">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <Typography variant="h6" className="text-lg">Grand Total:</Typography>
                <Typography variant="h6" className="font-bold text-2xl">৳ {totalPrice}</Typography>
            </div>
        </section>
    );

    const header = (
        <section className="bg-black text-white py-4 rounded-t-lg">
            <Typography variant="h6" align="center">Your Cart Items</Typography>
        </section>
    );

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);

        const checkedValue = event.target.checked;
        if (checkedValue === true) {
            setShipping(userData?.address || "");
        }
        else if (checkedValue === false) {
            setShipping('');
        }
    };


    const proceedToOrder = (e: any) => {
        e.preventDefault();

        setLoading(true);

        const products = Object.entries(myCart).reduce((acc: any, [key, value]) => {
            acc[key] = value.quantity;
            return acc;
        }, {})

        const body = {
            shipping_address: shipping,
            payment_type: paymentMethod,
            products: products
        }

        createOrder(body,
            (data) => {
                if (data?.payment_type === "online") {
                    if (data?.response_data?.GatewayPageURL !== null) {
                        window.location.replace(data?.response_data?.GatewayPageURL);
                    }
                }
                else if (data?.payment_type === "cash") {
                    setSnackbarState({
                        isActive: true,
                        verticalPosition: "top",
                        horizontalPosition: "center",
                        message: "Order has been created succesfully !",
                        alertType: "success"
                    });

                    setTimeout(() => {
                        setLoading(false);
                        dispatch(clearCart());
                        navigate('/user_profile/my_orders');
                    }, 1600);
                }
            },
            (res) => {
                setLoading(false);
                console.log(res)
                setSnackbarState({
                    isActive: true,
                    verticalPosition: "top",
                    horizontalPosition: "center",
                    message: "Error while creating order !",
                    alertType: "error"
                });
            }
        )
    };

    return (
        <main className="container mx-auto py-8 px-4">
            <>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={() => { }}
                >
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <CircularProgress color="inherit" />
                        <Typography className=" text-center">Please wait for a while!!</Typography>
                    </div>

                </Backdrop>

                {snackbarState?.isActive && (
                    <GlobalSnackbar
                        verticalPosition={snackbarState?.verticalPosition}
                        horizontalPosition={snackbarState?.horizontalPosition}
                        message={snackbarState?.message}
                        alertType={snackbarState?.alertType}
                        onfinish={() => {
                            setSnackbarState({ ...snackbarState, isActive: false })
                        }}
                    />
                )}
            </>
            <form onSubmit={proceedToOrder}>
                <section className="flex flex-col md:flex-row gap-5">

                    {/* Left Section */}
                    <article className="w-full space-y-4">

                        <div className="space-y-4 shadow-lg shadow-violet-200 p-5 rounded-lg">
                            <Typography className="text-2xl font-semibold">Your Information</Typography>
                            <BasicInfo userData={userData} setUserData={setUserData} />
                            <Divider />
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckboxChange}
                                    />
                                } label="Same as current address" />
                            </FormGroup>
                            <TextField
                                fullWidth
                                label="Shipping Address"
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                                multiline
                                rows={4}
                                variant="outlined"
                                required
                            />
                        </div>

                        <div className="space-y-4 shadow-lg shadow-violet-200 p-5 rounded-lg">
                            <Typography className="text-2xl font-semibold">Payment Method</Typography>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                className="space-y-2"
                            >
                                <FormControlLabel
                                    value="online"
                                    control={<Radio color="secondary" />}
                                    label="Online Payment"
                                />
                                <FormControlLabel
                                    value="cash"
                                    control={<Radio color="secondary" />}
                                    label="Cash on Delivery"
                                />
                            </RadioGroup>
                            <div>
                                <Typography className="mb-1">We accept:</Typography>
                                <img src={all_payment_img} alt="" />
                            </div>
                        </div>
                        <div className="hidden md:block mt-6">
                            <Button type="submit" variant="contained" color="primary" size="large" className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200">
                                Place Order
                            </Button>
                        </div>

                    </article>


                    {/* Right Section */}
                    <article className="w-full">
                        <div>
                            <OrderSummary header={header} footerElement={footerElement} cart={myCart} disableItemUpdate={true} />
                        </div>
                    </article>
                </section>

                <div className="block md:hidden mt-6 text-center">
                    <Button type="submit" variant="contained" color="primary" size="large" className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200">
                        Place Order
                    </Button>
                </div>
            </form>
        </main >
    );
};

export default CheckoutPage;
