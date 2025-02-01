import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import GenericLayout from "../Layout/GenericLayout";
import Home from "../Pages/Home/Home";
import ProductLists from "../Pages/ProductLists/ProductLists";
import LoginUser from "../Pages/UserContents/LoginUser/LoginUser";
import RegisterUser from "../Pages/UserContents/RegisterUser/RegisterUser";
import UserRoute from "./UserRoute";
import UserLayout from "../Layout/UserLayout";
import UserProfile from "../Pages/UserContents/UserProfile/UserProfile";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ProductCart from "../Pages/ProductCart/ProductCart";
import MyOrders from "../Pages/UserContents/MyOrders/MyOrders";
import MyWishList from "../Pages/UserContents/MyWishList/MyWishList";
import CheckoutPage from "../Pages/Orders/CheckoutPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ValidatorPage from "../Pages/ValidatorPage/ValidatorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ScrollToTop><GenericLayout /></ScrollToTop>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products/:category",
                element: <ProductLists />
            },
            {
                path: "/login",
                element: <LoginUser />
            },
            {
                path: "/register",
                element: <RegisterUser />
            },
            {
                path: "/product_details/:id",
                element: <ProductDetails />
            },
            {
                path: "/product_cart",
                element: <ProductCart />
            },
            {
                path: "/checkout",
                element: <UserRoute><CheckoutPage /></UserRoute>
            },
            {
                path: "/payment/:val_id",
                element: <ValidatorPage />
            },
            {
                path: "/user_profile",
                element: (
                    <UserRoute>
                        <UserLayout />
                    </UserRoute>
                ),
                children: [
                    {
                        path: "/user_profile",
                        element: <UserProfile />
                    },
                    {
                        path: "/user_profile/my_orders",
                        element: <MyOrders />
                    },
                    {
                        path: "/user_profile/my_wishlist",
                        element: <MyWishList />
                    },
                ]
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }
]);

export default router;