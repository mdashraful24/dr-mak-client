import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        children: [
            { index: true, Component: Home }
        ]
    },
]);