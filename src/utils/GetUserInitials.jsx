import useAuth from "../hooks/useAuth";

const GetUserInitials = () => {
    const { user } = useAuth();

    if (user?.displayName) {
        return user.displayName
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    return user?.email?.charAt(0).toUpperCase() || "U";
};

export default GetUserInitials;