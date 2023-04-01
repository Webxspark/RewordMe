import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from 'react';
const Card = () => {
    const [showDivs, setShowDivs] = useState(false);

    useEffect(() => {
        setShowDivs(true);
    }, []);
    return (
        <div className={`animate-pulse w-full bg-white p-6 flex justify-between items-center rounded-lg transition-all ${showDivs ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="flex-1 space-y-4 py-1">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
            </div>
            <div className="cursor-pointer text-[#969696] text-xl p-2 hover:bg-[#faf3ff]"><FaRegCopy /></div>
        </div>
    );
}
const SkeletonResponseCard = () => {
    return(
        <>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </>
    )
}
export default SkeletonResponseCard;