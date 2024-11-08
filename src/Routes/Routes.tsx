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
                element: <ProductDetails/>
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
                ]
            }
        ]
    }
]);

export default router;