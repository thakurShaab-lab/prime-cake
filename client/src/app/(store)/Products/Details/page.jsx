"use client"

import { useState } from "react"

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState("/product/dm-pro1.jpg")
  const [qty, setQty] = useState(1)

  const images = [
    "/dm-pro1.jpg",
    "/dm-pro2.jpg",
    "/dm-pro3.jpg",
    "/dm-pro4.jpg",
  ]

  return (
    <div>
      <img src="/inner_bnr.jpg" className="w-full" />
      <div className="bg-gray-100 py-2 px-4 text-sm">
        Home / Category / Sub Category / Products / Product Detail
      </div>
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className="w-16 h-16 border rounded cursor-pointer hover:border-black"
              />
            ))}
          </div>
          <div className="relative border rounded-lg w-full h-105 flex items-center justify-center">
            <span className="absolute top-0 right-3 bg-green-400 text-xs px-2 py-1 rounded-b">
              In Stock
            </span>
            <img src={activeImage} className="max-h-full object-contain" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            Handicrafts Wall Decor
          </h1>
          <p className="text-sm mt-1">
            <b>Product Code:</b> 32625
          </p>
          <div className="mt-3 border rounded px-3 py-2 inline-block bg-gray-50 text-sm">
            ⭐ 4.1 | 157 reviews |{" "}
            <span className="text-blue-500 cursor-pointer">
              Write a review
            </span>
          </div>
          <div className="mt-4 flex gap-3 items-center">
            <p className="w-24 font-medium">Size :</p>
            <div className="flex gap-2 flex-wrap">
              {["500gms", "1kg", "2kg", "3kg"].map((s, i) => (
                <button
                  key={i}
                  className="border px-3 py-1 rounded hover:border-black"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-3 items-center">
            <p className="w-24 font-medium">Color :</p>
            <div className="flex gap-2">
              {["red", "blue", "yellow", "green", "purple"].map((c, i) => (
                <span
                  key={i}
                  className="w-6 h-6 rounded-full cursor-pointer border"
                  style={{ background: c }}
                ></span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-3 items-center">
            <p className="w-24 font-medium">Quantity :</p>
            <div className="flex border rounded">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3"
              >
                -
              </button>
              <input
                value={qty}
                className="w-12 text-center outline-none"
                readOnly
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-5 border-y py-4 flex justify-between items-center">
            <p className="text-xl font-bold">
              AED999.00{" "}
              <span className="line-through text-gray-400 text-sm">
                AED1100.00
              </span>
            </p>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                ADD TO CART
              </button>
              <button className="bg-black text-white px-4 py-2 rounded">
                BUY NOW
              </button>
              <button className="border p-2 rounded">
                ❤️
              </button>
            </div>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <button className="border px-3 py-1 rounded">
              👤 Refer a Friend
            </button>
            <button className="border px-3 py-1 rounded">
              ▶ Watch Video
            </button>
            <button
              onClick={() => window.print()}
              className="border px-3 py-1 rounded"
            >
              🖨 Print
            </button>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Share On :</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-600 text-white px-2 py-1 rounded">
                FB
              </button>
              <button className="bg-black text-white px-2 py-1 rounded">
                TW
              </button>
              <button className="bg-green-500 text-white px-2 py-1 rounded">
                WA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        {[1, 2, 3].map((r) => (
          <div key={r} className="bg-white shadow p-3 mb-3 rounded">
            <p className="font-semibold">User Name</p>
            <p className="text-sm text-gray-500">06 July, 2024</p>
            <p className="text-yellow-500">⭐⭐⭐⭐☆</p>
            <p className="text-sm mt-1">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border rounded p-2 text-center hover:shadow"
            >
              <img src="/images/pro1.jpg" className="mx-auto" />
              <p className="text-sm mt-2">
                Product Name
              </p>
              <p className="font-bold">AED27.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}