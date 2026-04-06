"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getCartAPI, updateCartQtyAPI, removeCartItemAPI } from "@/services/cartService"
import { getShippingAPI, getDefaultShippingAPI, getUserShippingAPI, applyShippingAPI } from "@/services/shippingService"

export default function CartPage() {
    const [shippingList, setShippingList] = useState([])
    const [selectedShipping, setSelectedShipping] = useState(null)
    const [cartItems, setCartItems] = useState([])

    const fetchCart = async () => {
        try {
            const res = await getCartAPI()
            setCartItems(res.data.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchCart()
        fetchShipping()
    }, [])

    const fetchShipping = async () => {
        try {
            const res = await getShippingAPI()
            setShippingList(res.data || [])
    
            const userShipping = await getUserShippingAPI()
    
            if (userShipping.data) {
                setSelectedShipping(userShipping.data)
            } else {
                const def = await getDefaultShippingAPI()
                setSelectedShipping(def.data)
            }
    
        } catch (err) {
            console.error(err)
        }
    }

    const updateQty = async (id, type) => {
        try {
            const res = await updateCartQtyAPI(id, type)

            if (res.message === "Item removed from cart") {
                setCartItems(prev => prev.filter(item => item.id !== id))
            } else {
                setCartItems(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, qty: res.qty } : item
                    )
                )
            }

        } catch (err) {
            console.error(err)
        }
    }

    const removeItem = async (id) => {
        try {
            await removeCartItemAPI(id)
            setCartItems(prev => prev.filter(item => item.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const subTotal = (cartItems || []).reduce(
        (acc, item) => acc + Number(item.price) * Number(item.qty),
        0
    )
    
    const shippingCharge = Number(selectedShipping?.shipment_rate || 0)
    
    const vat = subTotal * 0.10
    
    const grandTotal = subTotal + vat + shippingCharge

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
                                        src='/pro7.jpg'
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
                                            AED {item.price}
                                            <span className="line-through text-sm text-gray-400 ml-2">
                                                AED {item.oldPrice}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <p>
                                            Total Amount:{" "}
                                            <b>AED {item.price * item.qty}</b>
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
                                <span>AED {subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Shipping Type:</span>
                                <select className="border rounded px-2 py-1 text-sm">
                                    <option>Select Shipping</option>
                                </select>
                            </div>
                            <select
                                className="border rounded px-2 py-1 text-sm"
                                value={selectedShipping?.shipping_id || ""}
                                onChange={async (e) => {
                                    const selected = shippingList.find(
                                        s => s.shipping_id == e.target.value
                                    )

                                    setSelectedShipping(selected)

                                    try {
                                        await applyShippingAPI({
                                            shipping_id: selected.shipping_id,
                                            shipment_rate: selected.shipment_rate,
                                            shipping_type: selected.shipping_type
                                        })
                                    } catch (err) {
                                        console.error(err)
                                    }
                                }}
                            >
                                <option value="">Select Shipping</option>

                                {shippingList.map((ship) => (
                                    <option key={ship.shipping_id} value={ship.shipping_id}>
                                        {ship.shipping_type} (AED {ship.shipment_rate})
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-between">
                                <span>VAT (10%):</span>
                                <span>AED {vat.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Grand Total:</span>
                                <span>AED {grandTotal.toFixed(2)}</span>
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
