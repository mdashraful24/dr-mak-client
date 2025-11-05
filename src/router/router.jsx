import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/common/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        children: [
            { index: true, Component: Home }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }
]);