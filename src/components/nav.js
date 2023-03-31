import Pfp from "../assets/pfp.png";
export default function Navbar() {
    return (
        <>
            <nav className="grid grid-cols-2 items-center h-24 shadow-md bg-white text-black" role="navigation">
                <a href="/" className="pl-8 text-2xl text-[#000] font-bold">Reword<span className="text-[#0072f5]">Me</span></a>
                <div className="px-4 cursor-pointer md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="flex justify-end items-center mr-12 gap-2">
                    <div className="pr-8 md:block hidden">
                        <a href="/" className="p-4 text-black font-semibold text-md">Contact Us</a>
                        <a href="/" className="p-4 text-black font-semibold text-md">Feedback</a>
                        <a href="/" className="p-4 text-black font-semibold text-md">API</a>
                    </div>
                    <a href="https://webxspark.com" rel="dofollow noreferrer noopener" target={'_blank'} >
                        <img alt="" src={Pfp} className="w-16 h-16 p-2 cursor-pointer hover:drop-shadow-md transition-300 rounded-full ease-in-out duration-200 " />
                    </a>
                    <span className="flex flex-col ">
                        <span className="font-semibold text-md pt-2">Team Sparkeans</span>
                        <a href="https://webxspark.com" rel="dofollow noreferrer noopener" target={'_blank'} ><p className="text-blue-700 text-sm">@webxspark</p></a>
                    </span>
                </div>
            </nav>
        </>
    )
}