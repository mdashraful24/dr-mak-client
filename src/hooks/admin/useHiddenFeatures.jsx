import useAuth from "../useAuth";

const useHiddenFeatures = () => {
    const { user } = useAuth();

    // console.log("User: ", user?.role);

    const isAdmin = user?.role === "admin";

    return { isAdmin };
};

export default useHiddenFeatures;