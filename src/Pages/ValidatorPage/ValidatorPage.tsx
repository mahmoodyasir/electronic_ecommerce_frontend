import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { validatePayment } from "../../ApiGateways/orders";
import { Box, CircularProgress, Typography } from "@mui/material";

const ValidatorPage = () => {
    const { val_id } = useParams();
    const [paymentData, setPaymentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const body = {
            val_id: val_id
        }

        validatePayment(body,
            (data) => {
                const response = data?.data;

                if (response?.status === "VALIDATED") {
                    setPaymentData(response?.data);
                    setLoading(false);
                }
                else {
                    setError("Failed to validate payment.");
                    setLoading(false);
                }
            },
            (res) => {
                console.log(res);
                setError(res?.data?.data?.status || "Failed to validate payment.");
                setLoading(false);
            }
        )

    }, [val_id]);

    if (loading) {
        return <Box>
            <div className="w-full h-screen flex gap-4 justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className=" flex flex-col items-center justify-center">
                    <section>
                        <CircularProgress className=" text-violet-500" />
                    </section>
                    <section>
                        <Typography className="text-xl">Validating payment...</Typography>
                    </section>
                </div>
            </div>

        </Box>;
    }


    if (error) {
        return <div className="flex h-screen items-center justify-center text-xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-red-400">
            {error.split('_').join(" ")}
        </div>;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center"
            >
                <h2 className="text-2xl font-bold text-blue-600">Payment Validated</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Your transaction was successful!</p>

                <div className="mt-6 space-y-3">
                    <p><span className="font-semibold">Transaction ID:</span> {paymentData?.tran_id}</p>
                    <p><span className="font-semibold">Paid Amount:</span> {paymentData?.amount} {paymentData?.currency}</p>
                    <p><span className="font-semibold">Paid By:</span> {paymentData?.card_issuer} ({paymentData?.card_brand})</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link
                        to="/user_profile/my_orders"
                        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-lg"
                    >
                        View Payment Details
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ValidatorPage;
