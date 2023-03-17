import Pfp from "../assets/pfp.png";
export default function Navbar() {
    return (
        <>
            {/* Generate a navbar using tailwindcss */}
            <nav className="flex justify-between items-center h-24 shadow-md bg-white text-black relative" role="navigation">
                <a href="/" className="pl-8 text-2xl font-bold">RewordMe</a>
                <div className="px-4 cursor-pointer md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="pr-8 md:block hidden">
                    <a href="/" className="p-4 font-semibold text-xl">Contact Us</a>
                    <a href="/" className="p-4 font-semibold text-xl">Feedback</a>
                    <a href="/" className="p-4 font-semibold text-xl">API</a>
                </div>

                {/* <div className="pr-0">
                </div> */}
            </nav>
        </>
    )
}