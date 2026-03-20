"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const cartItemsData = [
    {
        id: 1,
        name: "DGF Red Fruits Puree (Mixed Fruit) 1 Kg",
        image: "/pro1.jpg",
        code: "32625",
        size: "1 kg",
        color: "White",
        price: 999,
        oldPrice: 1199,
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(
        cartItemsData.map((item) => ({ ...item, qty: 1 }))
    )

    const updateQty = (id, type) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = type === "inc" ? item.qty + 1 : item.qty - 1
                    return { ...item, qty: newQty > 1 ? newQty : 1 }
                }
                return item
            })
        )
    }

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    )

    const vat = subTotal * 0.05
    const grandTotal = subTotal + vat

    return (
        <div className="pb-10">
            <div className="bg-[#f2eee7] py-2">
                <div className="max-w-330 mx-auto px-3">
                    <ol className="flex text-sm">
                        <li>
                            <a href="#" className="text-[#a68849]">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-500">Cart</li>
                    </ol>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-6 grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h1 className="text-2xl font-bold mb-4">
                        My Cart ({cartItems.length})
                    </h1>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 mb-4 border-b border-gray-300"
                        >
                            <div className="flex gap-4">
                                <div className="w-24">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-semibold text-gray-800">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Product Code: <b>{item.code}</b>
                                        <br /> Size: <b>{item.size}</b>, Color: <b>{item.color}</b>
                                    </p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex border rounded p-1">
                                            <button
                                                onClick={() => updateQty(item.id, "dec")}
                                                className="px-3 text-red-600 font-bold text-2xl"
                                            >
                                                -
                                            </button>
                                            <input
                                                value={item.qty}
                                                readOnly
                                                className="w-10 text-center outline-none font-bold"
                                            />
                                            <button
                                                onClick={() => updateQty(item.id, "inc")}
                                                className="px-2 text-green-600 font-bold text-2xl"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="font-medium">
                                            AED{item.price}
                                            <span className="line-through text-sm text-gray-400 ml-2">
                                                AED{item.oldPrice}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <p>
                                            Total Amount:{" "}
                                            <b>AED{item.price * item.qty}</b>
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                <Image src='/delete.svg' width={20} height={20} alt="Remove Product" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold mb-2">Price Details</h3>
                        <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Sub Total:</span>
                                <span>AED{subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Shipping Type:</span>
                                <select className="border rounded px-2 py-1 text-sm">
                                    <option>Select Shipping</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Charges:</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VAT (5%):</span>
                                <span>AED{vat.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Grand Total:</span>
                                <span>AED{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <button className="w-full bg-[#a68849] text-white py-2 rounded hover:bg-gray-600">
                                <Link href='/Checkout'>Checkout</Link>
                            </button>
                            <button className="w-full bg-black text-white py-2 rounded">
                                <Link href='/Category'>Continue Shopping</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
