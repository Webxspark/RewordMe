import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserInfo from "./userInfo";
import { LoginStatusContext } from "./LoginContext";
export default function Navbar() {
    const [MobileDrawerVisibility, setMobileDrawerVisibility] = useState("hidden");
    const { isLoggedIn, setLogoutSessionPrompt, userCredits } = useContext(LoginStatusContext);
    function updateNavVisibility() {
        setMobileDrawerVisibility(swapVisibility(MobileDrawerVisibility));
    }
    function swapVisibility(current) {
        return current == 'hidden' ? 'block' : 'hidden';
    }
    return (
        <>
            <nav className="grid grid-cols-2 items-center sticky top-0 z-50 lg:static lg:h-24 h-16 shadow-md bg-white text-black" role="navigation">
                <Link to="./reword-me/" className="pl-8 text-2xl pt-3 md:pt-0 text-[#000] h-full flex items-center font-bold">Reword<span className="text-[#0072f5]">Me</span></Link>
                <div className="flex justify-end h-full items-center sm:mr-12  gap-2">
                    <div className="pr-8 md:block hidden">
                        <Link to="./reword-me/contact-us" className="p-4 text-black font-semibold text-md">Contact</Link>
                        <Link to="./reword-me/api" className="p-4 text-black font-semibold text-md">API</Link>
                        {isLoggedIn ? <a onClick={() => { setLogoutSessionPrompt(true) }} className="p-4 text-black font-semibold text-md">Logout</a> : <></>}
                    </div>
                    <div className="flex h-full items-center">
                        {<UserInfo />}
                        {userCredits ? <><div className="md:hidden text-sm font-[Inter]">
                            <p className="font-semibold text-sm bg-[#0072f5] font-[Inter] text-white rounded-full px-3 py-1">Credits: {userCredits}</p>
                        </div></> : <></>}
                        <div className="px-4 h-full flex justify-end items-center md:pt-0 cursor-pointer md:hidden" onClick={updateNavVisibility}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div className={"w-full " + MobileDrawerVisibility} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-200 absolute w-full left-0">
                        <Link onClick={updateNavVisibility} to="./reword-me/contact-us" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">Contact</Link>
                        <Link onClick={updateNavVisibility} to="./reword-me/api" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">API</Link>
                        {isLoggedIn ? (<>
                            <a onClick={() => { updateNavVisibility(); setLogoutSessionPrompt(true) }} href="javascript:void(0);" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">Logout</a>
                        </>) : (<>
                            <a onClick={() => { updateNavVisibility(); document.getElementById('login-btn').click() }} href="javascript:void(0);" className="hover:text-black hover:bg-gray-100 block px-3 py-2 rounded-md text-[#000] font-medium">Login</a>
                        </>)}

                    </div>
                </div>
            </nav>
        </>
    )
}