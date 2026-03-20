"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ReferFriendModal from "@/components/ReferFriendModal"

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Contact Us", path: "/ContactUs" },
    { name: "Testimonials", path: "/Testimonials" },
    { name: "Refer to Friend", path: "/refer" },
    { name: "FAQ's", path: "/FAQ" },
    { name: "Privacy Policy", path: "/Privacy&Policy" },
    { name: "Terms and Conditions", path: "/Terms&Conditions" },
    { name: "Legal Disclaimer", path: "/LegalDesclaimer" },
]

const accountLinks = [
    { name: "Sign In", path: "/login" },
    { name: "Sign Up", path: "/register" },
    { name: "View Cart", path: "/cart" },
    { name: "My Wishlist", path: "/wishlist" },
    { name: "Track My Order", path: "/track-order" },
]

const categories = [
    { name: "Chocolate", path: "/category/chocolate" },
    { name: "Ingredients", path: "/category/ingredients" },
    { name: "Cake Decoration", path: "/category/cake-decoration" },
    { name: "Edible Printing", path: "/category/edible-printing" },
    { name: "Storage & Presentation", path: "/category/storage-presentation" },
    { name: "Tools", path: "/category/tools" },
    { name: "Occasions", path: "/category/occasions" },
    { name: "Shop All", path: "/shop" },
]

export default function Sitemap() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div>
                <div className="w-full">
                    <Image
                        src="/inner_bnr.jpg"
                        alt="Banner"
                        width={1920}
                        height={400}
                        className="w-full h-auto"
                        priority={false}
                    />
                </div>
                <nav className="bg-[#f2eee7] py-3">
                    <div className="container mx-auto px-4">
                        <ol className="flex text-sm text-[#a68849] space-x-2">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-800 font-medium">Sitemap</li>
                        </ol>
                    </div>
                </nav>
                <div className="my-6">
                    <div className="container mx-auto px-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
                            <div className="mt-4 rounded-lg p-4 shadow-xl">
                                <p className="font-bold uppercase mb-3">Quick Links</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {quickLinks.map((item, i) =>
                                        item.name === "Refer to Friend" ? (
                                            <button
                                                key={i}
                                                onClick={() => setOpen(true)}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                key={i}
                                                href={item.path}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <p className="font-bold uppercase mb-3">My Account</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {accountLinks.map((item, i) =>
                                        item.name === "Refer to Friend" ? (
                                            <button
                                                key={i}
                                                onClick={() => setOpen(true)}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                key={i}
                                                href={item.path}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <p className="font-bold uppercase mb-3">Categories</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((item, i) =>
                                        item.name === "Refer to Friend" ? (
                                            <button
                                                key={i}
                                                onClick={() => setOpen(true)}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                key={i}
                                                href={item.path}
                                                className="w-[32%] text-center border border-gray-200 rounded-md px-3 py-2 hover:bg-[#b89f6d] hover:text-white hover:border-[#b89f6d] transition"
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReferFriendModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    )
}