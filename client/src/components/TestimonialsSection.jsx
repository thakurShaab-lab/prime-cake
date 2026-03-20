"use client"

import { useState } from "react"

const testimonials = [
    {
        text: "“ Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque. ”",
        name: "Amalia Nicole",
    },
    {
        text: "“ Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque. ”",
        name: "Deepika",
    },
    {
        text: "“ Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque. ”",
        name: "Priyanka",
    },
    {
        text: "“ Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque. ”",
        name: "Vineeta Kapoor",
    },
]

export default function Testimonials() {
    const [index, setIndex] = useState(0)

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const nextSlide = () => {
        setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    return (
        <div
            className="bg-white bg-repeat-x bg-top" style={{ backgroundImage: "url('/tm_bg.jpg')" }}>
            <div className="max-w-330 mx-auto pb-3 px-3">
                <div className="flex justify-between items-center">
                    <h2 className="uppercase font-medium text-[20px]">
                        Our Testimonials
                    </h2>

                    <span className="font-semibold uppercase">
                        <a className="border px-3 py-1 text-[13px] hover:bg-black hover:text-white transition cursor-pointer">
                            View More
                        </a>
                    </span>
                </div>
                <div className="mt-3 relative w-full">
                    <button
                        onClick={prevSlide}
                        className="absolute -left-5 top-1/3 z-10 bg-gray-400 border w-10 h-10 rounded-full shadow hover:bg-[#b89f6d]"
                    >
                        ‹
                    </button>
                    <div className="w-full">
                        <div className="bg-white border border-[#f1ede4] shadow-[0_5px_5px_#e3ded3] hover:shadow-[0_5px_5px_#bdb9b1] rounded-[30px] px-7.5 py-6.25 w-full">
                            <div className="text-[1.44em] leading-[1.44em] italic text-[#404041] text-center h-24 w-[80%] mx-auto overflow-hidden mb-3 mt-3">
                                {testimonials[index].text}
                            </div>
                            <div className="text-center uppercase text-[#b89f6d] text-[1.11em] mt-3 mb-4 font-medium flex justify-center items-center gap-2">
                                <span className="w-4.25 border-t-2 border-[#b89f6d]"></span>
                                {testimonials[index].name}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={nextSlide}
                        className="absolute -right-5 top-1/3 z-10 bg-gray-400 border w-10 h-10 rounded-full shadow hover:bg-[#b89f6d]"
                    >
                        ›
                    </button>

                </div>
                <div className="py-2">

                    <div className="my-3">
                        <h3 className="text-[#4f4f4f] text-[1.44em] leading-[1.5em] font-medium">
                            Luxury Cake Decorating Essentials
                        </h3>

                        <div className="mt-1 text-[#666] text-[1em] leading-[1.5em] h-17.75 overflow-hidden opacity-80 font-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>

                    <div className="my-3">
                        <h3 className="text-[#4f4f4f] text-[1.44em] leading-[1.5em] font-medium">
                            Your One-Stop Cake Decoration Destination
                        </h3>

                        <div className="mt-1 text-[#666] text-[1em] leading-[1.5em] h-17.75 overflow-hidden opacity-80 font-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>

                    <div className="my-3">
                        <h3 className="text-[#4f4f4f] text-[1.44em] leading-[1.5em] font-medium">
                            Explore other categories on Prime Cake Household Utensils Trading Company
                        </h3>

                        <div className="mt-1 text-[#666] text-[1em] leading-[1.5em] h-17.75 overflow-hidden opacity-80 font-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}