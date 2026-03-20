import Link from "next/link"
import Image from "next/image"

export default function Header() {
    return (
        <header className="w-full shadow-sm sticky top-0 z-50 bg-white">

            <div className="border-b">
                <div className="max-w-300 mx-auto flex items-center justify-between py-4">

                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.jpg"
                            alt="Prime Cake Tools"
                            width={140}
                            height={60}
                            priority
                            className="object-contain"
                        />
                    </Link>
                    <div className="hidden lg:flex w-[65%] mt-4 pt-1">
                        <div className="flex w-full bg-[#f2eee7] border border-[#b89f6d] rounded-full relative overflow-hidden">
                            <div className="w-[36%]">
                                <select className="w-full h-10.25 bg-transparent px-3 text-[#666] outline-none">
                                    <option>Select Category</option>
                                </select>
                            </div>
                            <div className="w-[66%] border-l border-[#e0e0e0]">
                                <input
                                    type="text"
                                    placeholder="Entire the search keyword..."
                                    className="w-full h-10.25 px-3 bg-transparent outline-none text-[#666]"
                                />
                            </div>
                            <div className="absolute right-0 top-0 h-full">
                                <button className="bg-[#b89f6d] px-4 h-full rounded-r-full hover:bg-[#404041]">
                                    <Image src="/search_ico.svg" alt="" width={20} height={20} />
                                </button>
                            </div>
                        </div>
                        <p className="pl-3 text-[0.9em] mt-1">
                            <a className="text-[#9c824e] hover:text-[#404041] hover:underline cursor-pointer">
                                Advance Search
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <div className="flex border border-[#e0d5bf] rounded-full px-2 py-1 items-center">
                            <Image src="/user-icon.svg" width={34} height={34} alt="" />
                            <div className="text-[0.8em] leading-[1.3em] ml-1 whitespace-nowrap">
                                <b className="block opacity-80">My Account</b>
                                <a className="text-[#b89f6d] text-[1.1em]">Sign In</a>
                                <span className="px-1 text-[#dadada]">|</span>
                                <a className="text-[#b89f6d] text-[1.1em]">Sign Up</a>
                            </div>
                        </div>
                        <div className="relative px-2 pt-2">
                            <span className="absolute left-5.25 top-0 bg-[#a68849] text-white text-[0.75em] w-4.5 h-4.5 flex items-center justify-center rounded">
                                10
                            </span>
                            <Image src="/wish-icon.svg" width={28} height={28} alt="" />
                        </div>
                        <div className="relative px-2 pt-2">
                            <span className="absolute left-4.75 top-0 bg-[#a68849] text-white text-[0.75em] w-4.5 h-4.5 flex items-center justify-center rounded">
                                10
                            </span>
                            <Link href='/Cart'>
                                <Image src="/cart-icon.svg" width={28} height={28} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="bg-[#404041] text-white text-sm">
                <div className="max-w-300 mx-auto">
                    <ul className="flex items-center gap-4 py-3 font-medium">
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]">
                            <Link href="/">HOME</Link>
                        </li>
                        <li className="relative group">
                            <button className="flex items-center gap-1 cursor-pointer transition-colors duration-300 hover:text-[#b89b5e] focus:outline-none">
                                CHOCOLATE
                                <span className="text-xs mt-0.5">▼</span>
                            </button>
                            <ul className="absolute left-0 mt-3 w-56 bg-[#404041] shadow-lg py-2 rounded opacity-0 invisible translate-y-2 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 z-50">
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">DARK CHOCOLATE</Link>
                                </li>
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">MILK CHOCOLATE</Link>
                                </li>
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">BELGIAM CHOCOLATE</Link>
                                </li>
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">SOFT CHOCOLATE</Link>
                                </li>
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">BROWN CHOCOLATE</Link>
                                </li>
                                <li><Link href="/" className="block px-4 py-2 text-white hover:text-orange-300">COCO RICH CHOCOLATE</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>INGREDIENTS</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>CAKE DECORATION</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>EDIBLE PRINTING</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>STORAGE & PRESENTATION</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>TOOLS</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>OCCASIONS</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/'>WHOLESALE</Link></li>
                        <li className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#b89b5e]"><Link href='/AboutUs'>ABOUT US</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}