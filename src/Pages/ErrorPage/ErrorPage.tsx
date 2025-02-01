import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col space-y-6 items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-7xl font-extrabold"
            >
                404
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-400 text-center"
            >
                Oops! The page you're looking for doesn't exist.
            </motion.p>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link 
                    to="/" 
                    className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-lg"
                >
                    Go Back Home
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            >
                Need help? <a href="/contact" className="text-blue-500 hover:underline">Contact Support</a>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
