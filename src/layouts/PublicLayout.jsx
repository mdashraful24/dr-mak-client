import { Outlet } from "react-router";

const PublicLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default PublicLayout;