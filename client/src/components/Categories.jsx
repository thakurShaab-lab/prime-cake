"use client"

import { useState, useEffect, useRef } from "react"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [startIndex, setStartIndex] = useState(0)

  const visibleCount = 6 // Show 6 in a row
  const containerRef = useRef(null)

  useEffect(() => {
    setCategories([
      { name: "Cake Box", img: "/cate-pic1.jpg" },
      { name: "Sprinkles", img: "/cate-pic2.jpg" },
      { name: "Fondant", img: "/cate-pic3.jpg" },
      { name: "Fillings", img: "/cate-pic4.jpg" },
      { name: "Silicone Mould", img: "/cate-pic5.jpg" },
      { name: "Food Colours", img: "/cate-pic6.jpg" },
      { name: "Cake Box", img: "/cate-pic1.jpg" },
      { name: "Sprinkles", img: "/cate-pic2.jpg" },
      { name: "Fondant", img: "/cate-pic3.jpg" },
      { name: "Fillings", img: "/cate-pic4.jpg" },
      { name: "Silicone Mould", img: "/cate-pic5.jpg" },
      { name: "Food Colours", img: "/cate-pic6.jpg" },
    ])
  }, [])

  const nextSlide = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const slideWidth = 100 / visibleCount // % width per item

  return (
    <div className="bg-[#f1ede5] py-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 relative">
        <button
          onClick={prevSlide}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-400 shadow rounded-full w-10 h-10 flex items-center justify-center"
        >
          ◀
        </button>

        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${startIndex * slideWidth}%)` }}
          >
            {categories.map((cat, i) => (
              <div
                key={i}
                className="shrink-0 p-2"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="bg-white rounded-2xl p-2 mx-auto transition-all duration-300 hover:from-[#8a754a] hover:to-[#b89f6d] group">
                  <div className="w-36 h-36 border-[3px] border-[#b9a06f] rounded-full overflow-hidden m-auto flex items-center justify-center">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-center mt-2 text-[1em] font-bold overflow-hidden h-8">
                    <a className="text-[#333] group-hover:text-[#b9a06f]">
                      {cat.name}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-400 shadow rounded-full w-10 h-10 flex items-center justify-center"
        >
          ▶
        </button>

        <div className="text-center mt-6">
          <button className="inline-block px-4 py-2 border-2 border-[#b9a06f] bg-white rounded-[10px] text-[#444] font-bold uppercase hover:bg-[#b9a06f] hover:text-white transition">
            View More Categories
          </button>
        </div>
      </div>
    </div>
  )
}