import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContext);

    const isAuthenticated = !!auth?.user && !!auth?.accessToken;

    return {
        ...auth,
        isAuthenticated
    };
};

export default useAuth;




// // User with Firebase
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// const useAuth = () => {
//     const auth = useContext(AuthContext);
//     return auth;
// };

// export default useAuth;