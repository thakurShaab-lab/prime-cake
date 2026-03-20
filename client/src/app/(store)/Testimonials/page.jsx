"use client"

import { useState, useEffect } from "react"

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setTestimonials(new Array(2).fill({
        name: "Amalia Nicole",
        date: "26 Sep, 2025",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien."
      }))
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      <img src="/inner_bnr.jpg" className="w-full" alt="banner" />
      <div className="bg-[#f2eee7] py-2">
        <div className="max-w-330 mx-auto px-3">
          <ol className="flex text-sm">
            <li><a href="/" className="text-[#a68849]">Home</a></li>
            <li className="mx-2">/</li>
            <li className="text-gray-500">Testimonials</li>
          </ol>
        </div>
      </div>
      <div className="my-3">
        <div className="max-w-330 mx-auto px-3">
          <h1 className="text-[2.2em] font-semibold text-[#231f20] mb-3">
            Testimonials
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-9 order-2 lg:order-1">
              {loading && (
                <div className="flex justify-center mt-10">
                  <div className="w-12 h-12 border-4 border-[#a68849] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {!loading && testimonials.map((item, i) => (
                <div key={i} className="shadow-lg p-4 rounded-xl mb-3 hover:shadow-2xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12.5 h-12.5 rounded-full bg-[#ede8de] overflow-hidden flex items-center justify-center">
                        <img src="/quote.svg" alt="quote" />
                      </div>
                      <p className="font-bold text-dark">{item.name}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm mt-1 flex items-center gap-1">
                        <img src="/calendar.svg" className="w-4 h-4" />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="italic mt-3 h-16 overflow-hidden">
                    {item.text}
                  </div>
                  <p className="font-bold italic mt-2">
                    <a href="#" className="text-[#a68849]">
                      Read More...
                    </a>
                  </p>

                </div>
              ))}
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="p-3 border rounded shadow mb-3 bg-linear-to-b from-[#404041] to-[#444038]">
                <h2 className="uppercase font-bold text-white mb-3">
                  Post Testimonials
                </h2>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Name *"
                    className="w-full h-10 px-2 border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Email ID *"
                    className="w-full h-10 px-2 border rounded-lg bg-white"
                  />
                  <textarea
                    rows="4"
                    placeholder="Comment *"
                    className="w-full border rounded-lg px-2 py-2 bg-white"
                  ></textarea>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        placeholder="Enter Code *"
                        className="w-32.5 h-10 px-2 border rounded-lg  bg-white"
                      />
                      <img src="/captcha1.jpg" alt="captcha" />
                      <img src="/ref2.svg" alt="refresh" />
                    </div>
                    <small className="text-white block mt-1">
                      Type the characters shown above.
                    </small>
                  </div>
                  <button className="w-full bg-[#a68849] text-white py-2 rounded hover:bg-gray-800">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}