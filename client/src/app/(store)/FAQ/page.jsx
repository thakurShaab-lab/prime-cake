"use client"

import { useState } from "react"
import { MessageCircleQuestionMark } from "lucide-react"

export default function FAQPage() {
    const [open, setOpen] = useState(null)

    const toggle = (i) => {
        setOpen(open === i ? null : i)
    }

    const faqs = [
        "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit?",
        "Lorem ipsum dolor sit amet ctetur adipisicing elit?",
        "Lorem ipsum dolor sit consectetur adip isicing elit?",
    ]

    return (
        <div>
            <img src="/inner_bnr.jpg" className="w-full" alt="" />
            <div className="bg-[#f2eee7] py-2">
                <div className="max-w-330 mx-auto px-3">
                    <ol className="flex text-sm">
                        <li><a href="#" className="text-[#a68849]">Home</a></li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-500">FAQs</li>
                    </ol>
                </div>
            </div>
            <div className="my-3">
                <div className="max-w-330 mx-auto px-3">
                    <h1 className="text-[2.2em] font-semibold text-[#231f20] mb-3">
                        FAQ's
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-8">
                            <div className="p-3 shadow">
                                {faqs.map((q, i) => (
                                    <div key={i} className="border border-[#c5c5c5] mb-[0.3em] rounded-2xl overflow-hidden">

                                        <button
                                            onClick={() => toggle(i)}
                                            className={`w-full text-left relative pl-13 pr-3 py-3 text-[1.1em] font-semibold flex items-start transition-all duration-500 active:shadow-2xl
            ${open === i ? "bg-[#b89f6d] text-white" : "bg-[#fdfdff] text-black"}`}
                                        >
                                            <span className="absolute left-2.75 top-3 w-8 h-8">
                                                <MessageCircleQuestionMark />
                                            </span>
                                            {q}
                                            <span className="ml-auto transition-transform duration-500">
                                                {open === i ? "−" : "+"}
                                            </span>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out
            ${open === i ? "max-h-50 opacity-100" : "max-h-0 opacity-0"}`}
                                        >
                                            <div className="bg-white text-[#696e77] text-[1em] leading-[1.6em] border-t border-[#d5d5d5] p-3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <div className="rounded-lg overflow-hidden border mt-3 lg:mt-1 text-center">
                                <img
                                    src="/faqs_img.jpg"
                                    className="w-full"
                                    alt="faq"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}