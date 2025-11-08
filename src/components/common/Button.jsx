const Button = ({ text = "Click Me", bgColor = "blue", textColor = "white" }) => {
    
    const colors = {
        blue: "blue",
        green: "green",
        red: "red",
        yellow: "yellow",
        purple: "purple",
        gray: "gray",
        indigo: "indigo",
    };

    const bgClass = `bg-${colors[bgColor] || "blue"}-600`;
    const textClass = `text-${colors[textColor] || "white"}`;

    return (
        <button className={`px-6 py-3 ${bgClass} ${textClass} font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full`}>
            {text}
        </button>
    );
};

export default Button;
