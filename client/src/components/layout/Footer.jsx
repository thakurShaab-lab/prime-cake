"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ReferFriendModal from "../ReferFriendModal"

export default function Footer() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <footer className="bg-[#f1ede5] text-sm text-[#404041] py-11.25">
                <div className="">
                    <div className="max-w-300 mx-auto flex gap-18">
                        <div className="border-r border-gray-300 px-3">
                            <div className="leading-6 border-b border-b-gray-300 pb-4 mt-2 mb-3">
                                <h3 className="font-semibold mb-3 text-[#404041]">CONTACT DETAILS</h3>
                                <p className="text-[#404041]">401-C02, Horizon Building</p>
                                <p className="mt-1 text-[#404041]">+919090909090</p>
                                <p className="mt-1 text-[#404041]">primecaketools@gmail.com</p>
                            </div>
                            <h3 className="text-[#404041] font-semibold">CONNECT WITH US</h3>
                            <div className="flex gap-3 mt-4">
                                <Image src='/icon_fb.svg' alt="Facebook" width={12} height={12} />
                                <Image src='/icon_tw.svg' alt="Xstream" width={20} height={20} />
                                <Image src='/icon_in.svg' alt="LinkedIn" width={20} height={20} />
                                <Image src='/icon_insta.svg' alt="Instagram" width={20} height={20} />
                                <Image src='/icon_yt.svg' alt="YouTube" width={20} height={20} />
                            </div>
                        </div>
                        <div className="pr-3 pl-6">
                            <h3 className="font-semibold mb-3">QUICK LINKS</h3>
                            <ul className="leading-6 space-y-1 font-semi">
                                <li><Link href='/'>Home</Link></li>
                                <li><Link href='/AboutUs'>About Us</Link></li>
                                <li><Link href='/ContactUs'>Contact Us</Link></li>
                                <li><Link href='/Testimonials'>Testimonials</Link></li>
                                <li><button onClick={() => setOpen(true)} className="text-left hover:text-[#b89f6d]">Refer to Friend</button></li>
                                <li><Link href='/FAQ'>FAQ's</Link></li>
                                <li><Link href='/Privacy&Policy'>Privacy Policy</Link></li>
                                <li><Link href='/Terms&Conditions'>Terms and Conditions</Link></li>
                                <li><Link href='/LegalDesclaimer'>Legal Disclaimer</Link></li>
                                <li><Link href='/Sitemap'>Sitemap</Link></li>
                            </ul>
                        </div>
                        <div className="px-3">
                            <h3 className="font-semibold mb-3">MY ACCOUNT</h3>
                            <ul className="space-y-1 leading-6 font-semi">
                                <li><Link href='/Login'>Sign In</Link></li>
                                <li><Link href='/Signup'>Sign Up</Link></li>
                                <li><Link href='/Login'>View Cart</Link></li>
                                <li><Link href='/Login'>My Wishlist</Link></li>
                                <li><Link href='/Login'>Track My Order</Link></li>
                            </ul>
                        </div>
                        <div className="px-3 border-r border-gray-300">
                            <h3 className="font-semibold mb-3">OUR CATEGORIES</h3>
                            <ul className="space-y-1 leading-6 font-semi">
                                <li><Link href='/Category/Subcategory'>CHOCOLATE</Link></li>
                                <li><Link href='/Category/Subcategory'>INGREDIENTS</Link></li>
                                <li><Link href='/Category/Subcategory'>CAKE DECORATION</Link></li>
                                <li><Link href='/Category/Subcategory'>EDIBLE PRINTING</Link></li>
                                <li><Link href='/Category/Subcategory'>STORAGE & <br /> PRESENTATION</Link></li>
                                <li><Link href='/Category/Subcategory'>TOOLS</Link></li>
                                <li><Link href='/Category/Subcategory'>OCCASIONS</Link></li>
                                <li className="text-black"><Link href='/Category/Subcategory'>View All</Link></li>
                            </ul>
                        </div>
                        <div className="leading-6">
                            <h3 className="font-semibold mb-3">SIGN UP FOR NEWSLETTER</h3>
                            <p className="mb-2 text-xs">
                                Subscribe to our mailing list to get the new updates!
                            </p>
                            <input type="email" placeholder="Email Address *" className="w-full border p-2 mb-2" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="Enter Code *" className="flex-1 border p-2" />
                                <button className="border px-3">↻</button>
                            </div>
                            <button className="bg-[#b89b5e] text-white px-4 py-2 mt-3 w-full">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="max-w-300 mx-auto flex justify-between items-center py-4 text-xs border-t border-b border-gray-300">
                        <div className="flex gap-3 items-center">
                            <Image src="/pay_card1.jpg" alt="visa" width={58} height={32} />
                            <Image src="/pay_card2.jpg" alt="visa" width={58} height={32} />
                            <Image src="/pay_card3.jpg" alt="visa" width={58} height={32} />
                            <Image src="/pay_card4.jpg" alt="visa" width={58} height={32} />
                        </div>
                        <p className="flex-1 text-right">
                            Copyright © 2026, Prime Cake Household Utensils Trading L.L.C.
                        </p>

                    </div>
                </div>
                <p className="text-center mt-2.5">Developed and Managed by WeblinkIndia.NET</p>
            </footer>
            <ReferFriendModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    )
}