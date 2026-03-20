'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CategoryPage() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setCategories([
        { name: "Cake Box", img: "/cate-pic1.jpg", path: '/Category/Subcategory' },
        { name: "Sprinkles", img: "/cate-pic2.jpg", path: '/Category/Subcategory' },
        { name: "Fondant", img: "/cate-pic3.jpg", path: '/Category/Subcategory' },
        { name: "Fillings", img: "/cate-pic4.jpg", path: '/Category/Subcategory' },
        { name: "Silicone Mould", img: "/cate-pic5.jpg", path: '/Category/Subcategory' },
        { name: "Food Colours", img: "/cate-pic6.jpg", path: '/Category/Subcategory' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      <div>
        <img
          src="/inner_bnr.jpg"
          className="w-full"
          alt="Banner"
        />
      </div>
      <div className="bg-[#f2eee7] py-2">
        <div className="max-w-330 mx-auto px-3">
          <ol className="flex text-sm">
            <li>
              <a href="#" className="text-[#a68849]">Home</a>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-500">Categories</li>
          </ol>
        </div>
      </div>
      <div className="my-3">
        <div className="max-w-330 mx-auto px-3">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          {loading && (
            <div className="flex justify-center mt-10">
              <div className="w-12 h-12 border-4 border-[#a68849] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {!loading && (
            <div className="
              grid gap-2 mb-3
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-4
              lg:grid-cols-4
              xl:grid-cols-4
            ">
              {categories.map((cat, i) => (
                <div key={i} className="flex justify-center">
                  <Link href={cat.path} className="bg-white rounded-2xl p-2 w-45 mx-auto transition-all duration-300 hover:bg-linear-to-t hover:from-[#8a754a] hover:to-[#b89f6d] group">
                    <div className="w-38.5 h-38.5 border-[3px] border-[#b9a06f] rounded-full overflow-hidden m-auto flex items-center justify-center">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-center mt-2 h-8.25 text-[1.01em] leading-[1.1em] font-bold overflow-hidden">
                      <span className="text-[#333] group-hover:text-white">
                        {cat.name}
                      </span>
                    </p>
                  </Link>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}