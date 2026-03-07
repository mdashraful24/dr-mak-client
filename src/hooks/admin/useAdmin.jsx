import useAuth from "../useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth();

    // console.log("User: ", user);

    const isAdmin = user?.email === "test@gmail.com";

    return { isAdmin };
};

export default useAdmin; 
