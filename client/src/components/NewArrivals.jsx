"use client"

import Image from "next/image"

const products = [
    { img: "/pro1.jpg", name: "DGF Red Fruits Puree (Mixed Fruit) 1 Kg" },
    { img: "/pro2.jpg", name: "Sugarmill Gold Colour Mix Pearl, Vermicelli, Star, Heart Shape Sprinkles" },
    { img: "/pro3.jpg", name: "Chefmaster Liqua Gel - Turquoise 65ml" },
    { img: "/pro4.jpg", name: "Sugarmill Gold Colour Mix Pearl, Vermicelli, Star, Heart Shape Sprinkles" },
]

function truncateWords(text, limit = 4) {
    const words = text.split(" ")
    if (words.length <= limit) return text
    return words.slice(0, limit).join(" ") + "..."
}

export default function NewArrivals() {
    return (
        <div className="py-4">
            <div className="max-w-330 mx-auto px-3">

                <div className="flex justify-between items-center mt-3 mb-3">
                    <h2 className="uppercase font-medium text-[20px] tracking-wide">
                        NEW ARRIVALS
                    </h2>

                    <a className="uppercase font-semibold text-[13px] hover:underline cursor-pointer">
                        View More
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                    {products.map((item, i) => (
                        <div key={i} className="w-full border group">
                            <div className="relative bg-white overflow-hidden group transition-all duration-300 mb-2">
                                <div className="absolute top-2 left-2 bg-black text-white text-[11px] px-2 py-0.5 font-semibold z-10">
                                    60%
                                </div>
                                <div className="absolute top-2 right-2 z-10">
                                    <Image
                                        src="/wish-icon.svg"
                                        alt="wishlist"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <div className="overflow-hidden text-center">
                                    <div className="table w-full h-71.25">
                                        <div className="table-cell align-middle">
                                            <div className="overflow-hidden transition-transform duration-500 transform group-hover:scale-110">
                                                <Image
                                                    src={item.img}
                                                    alt={item.name}
                                                    width={285}
                                                    height={285}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-1 relative py-2 px-1">
                                    <div className="absolute left-0 right-0 bottom-15 mb-2 transform translate-y-2 opacity-0 group-hover:-translate-y-10 group-hover:opacity-100 transition-all duration-500">
                                        <a className="w-full bg-[#8a754a] text-white text-[13px] py-2 flex items-center justify-center gap-2">
                                            <Image src="/pro_cart.svg" alt="" width={20} height={20} />
                                            Add to Cart
                                        </a>
                                    </div>

                                    <p className="font-medium text-[14px] h-9.5 overflow-hidden leading-tight">
                                        {truncateWords(item.name)}
                                    </p>

                                    <div className="flex justify-center items-center mt-2 gap-1 text-[12px] text-gray-500">
                                        <b className="flex gap-0.5">
                                            {[...Array(4)].map((_, i) => (
                                                <Image key={i} src="/star.svg" alt="" width={11} height={11} />
                                            ))}
                                            <Image src="/star1.svg" alt="" width={11} height={11} />
                                        </b>
                                        <span>392 reviews</span>
                                    </div>

                                    <p className="text-center font-bold text-[14px] mt-1">
                                        AED27.99{" "}
                                        <del className="font-semibold text-gray-400 ml-1">
                                            AED30.00
                                        </del>
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}