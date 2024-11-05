import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import GenericLayout from "../Layout/GenericLayout";
import Home from "../Pages/Home/Home";
import ProductLists from "../Pages/ProductLists/ProductLists";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ScrollToTop><GenericLayout/></ScrollToTop>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/products/:category",
                element: <ProductLists/>
            },
        ]
    }
]);

export default router;