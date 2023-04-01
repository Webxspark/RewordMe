import { Link } from "react-router-dom";
import { useState } from "react";
import UserInfo from "./userInfo";
export default function Navbar() {
    const [MobileDrawerVisibility, setMobileDrawerVisibility] = useState("hidden");
    function updateNavVisibility() {
        setMobileDrawerVisibility(swapVisibility(MobileDrawerVisibility));
    }
    function swapVisibility(current) {
        return current == 'hidden' ? 'block' : 'hidden';
    }
    return (
        <>
            <nav className="grid grid-cols-2 items-center lg:h-24 h-16 shadow-md bg-white text-black" role="navigation">
                <Link to="/" className="pl-8 text-2xl pt-3 md:pt-0 text-[#000] h-full flex items-center font-bold">Reword<span className="text-[#0072f5]">Me</span></Link>
                <div className="px-4 w-full flex justify-end items-center pt-3 md:pt-0 cursor-pointer md:hidden" onClick={updateNavVisibility}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="flex justify-end items-center mr-12 gap-2">
                    <div className="pr-8 md:block hidden">
                        <Link to="/contact-us" className="p-4 text-black font-semibold text-md">Contact</Link>
                        <Link to="/feedback" className="p-4 text-black font-semibold text-md">Feedback</Link>
                        <Link to="/api" className="p-4 text-black font-semibold text-md">API</Link>
                    </div>
                    {<UserInfo />}
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div className={"sm:hidden w-full " + MobileDrawerVisibility} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-200 absolute w-full left-0">
                        <Link onClick={updateNavVisibility} to="/contact-us" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">Contact</Link>
                        <Link onClick={updateNavVisibility} to="/feedback" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">Feedback</Link>
                        <Link onClick={updateNavVisibility} to="/api" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">API</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}