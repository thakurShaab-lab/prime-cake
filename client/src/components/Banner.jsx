"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const banners = [
    {
        id: 1,
        img: "/inner_bnr.jpg",
        title: "",
        disc: "",
        subtitle: "",
    },
    {
        id: 2,
        img: "/slide12.jpg",
        title: "Classic Rainbow Crunchy Jimmies",
        disc: "UPTO 70% OFF",
        subtitle: "Rainbow Sprinkles for Cake Decoration",
    },
]

export default function Banner() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-125 overflow-hidden">
            {banners.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute w-full h-full transition-opacity duration-700 ${index === active ? "opacity-100 z-10" : "opacity-0"
                        }`}
                >
                    <Image
                        src={item.img}
                        alt="banner"
                        fill
                        className="object-cover"
                        priority
                    />

                    {index === active && (
                        <div
                            key={active}
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-white"
                        >
                            <div className="animate-slideIn">
                                {
                                    item.disc && (
                                        <p>{item.disc}</p>
                                    )
                                }
                                {item.title && (
                                    <h1 className="text-4xl font-bold mb-3">
                                        {item.title}
                                    </h1>
                                )}

                                {item.subtitle && (
                                    <p className="mb-4">{item.subtitle}</p>
                                )}

                                <button className="bg-[#c9a96e] px-6 py-2 rounded">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="absolute bottom-5 left-10 flex gap-3 z-20">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`w-2 h-2 rounded-full border-2 transition-all duration-300
        ${i === active
                                ? "bg-[#c9a96e] border-[#c9a96e] scale-110"
                                : "bg-white border-gray-400 opacity-80 hover:opacity-100"
                            }
      `}
                    />
                ))}
            </div>
        </div>
    )
}