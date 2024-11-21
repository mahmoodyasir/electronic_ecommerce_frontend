import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/app/hooks';
import { Button, Typography } from '@mui/material';
import OrderSummary from '../../component/OrderSummary/OrderSummary';
import { useNavigate } from 'react-router-dom';

const ProductCart = () => {
    const myCart = useAppSelector((state) => state.cartState);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);


    const footerElement = (
        <section className="flex flex-col sm:flex-row justify-between items-center bg-violet-600 text-white py-4 px-6 rounded-lg mt-4">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <Typography variant="h6" className="text-lg">Grand Total:</Typography>
                <Typography variant="h6" className="font-bold text-2xl">৳ {totalPrice}</Typography>
            </div>
            <Button
                onClick={() => navigate('/checkout')}
                className="bg-black text-white hover:bg-green-500 px-6 py-2 text-lg rounded-md shadow-md"
            >
                Proceed to Checkout
            </Button>
        </section>
    );

    const header = (
        <section className="bg-black text-white py-4 rounded-t-lg">
            <Typography variant="h6" align="center">Your Cart Items</Typography>
        </section>
    );

    useEffect(() => {
        const newTotal = Object.keys(myCart).reduce((total, key) => {
            const price = myCart[key]?.total_price || 0;
            return total + price;
        }, 0);
        setTotalPrice(newTotal);

        if(Object.entries(myCart).length < 1)
        {
            navigate('/');
        }
    }, [myCart]);

    return (
        <div className="flex justify-center w-full mt-6">
            <div className="w-full xl:w-2/5 lg:w-3/5 bg-gray-50 shadow-md rounded-lg">
                <OrderSummary header={header} footerElement={footerElement} cart={myCart} />
            </div>
        </div>
    );
};

export default ProductCart;
