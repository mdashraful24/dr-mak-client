import GetUserInitials from "../../utils/GetUserInitials";

const CompactProfileTrigger = () => {
    return (
        <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center group-hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] transition-all duration-200">
                <span className="font-semibold">
                    <GetUserInitials />
                </span>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        </div>
    );
};

export default CompactProfileTrigger;
