import { useState, useRef } from "react";

const Tooltip = ({ text, delay = 700, children, position = "" }) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setVisible(false);
    };

    const positionClasses = {
        right: "left-full ml-4 top-1/2 -translate-y-1/2",
        left: "right-full mr-3 top-1/2 -translate-y-1/2",
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        panelOC: "top-full mt-2 left-1/2 -translate-x-1/3",
        notification: "top-full mt-2 left-2 -translate-x-1/2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {visible && (
                <span
                    className={`absolute ${position ? positionClasses[position] : ""} bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg`}
                >
                    {text}
                </span>
            )}
        </div>
    );
};

export default Tooltip;
