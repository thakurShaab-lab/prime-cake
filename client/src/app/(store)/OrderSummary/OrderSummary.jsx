"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getCartAPI } from "@/services/cartService"
import { getUserShippingAPI } from "@/services/shippingService"
import { getTempAddressAPI } from "@/services/addressService"

export default function OrderSummary() {
  const [cartItems, setCartItems] = useState([])
  const [shipping, setShipping] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const cartRes = await getCartAPI()
      setCartItems(cartRes.data.data || [])

      const shipRes = await getUserShippingAPI()
      setShipping(shipRes.data)

      const addrRes = await getTempAddressAPI()

      if (addrRes.success && addrRes.data.length > 0) {
        setAddress(addrRes.data[0])
      }

    } catch (err) {
      console.error(err)
    }
  }

  const subTotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  )

  const shippingCharge = Number(shipping?.shipment_rate || 0)
  const vat = subTotal * 0.10
  const grandTotal = subTotal + vat + shippingCharge

  useEffect(() => {
    if (address?.address_id) {
      setSelectedAddressId(address.address_id)
    }
  }, [address])

  return (
    <div className="pb-10">
      <div className="bg-[#f2eee7] py-2">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex text-sm">
            <li>
              <Link href="/" className="text-[#a68849]">Home</Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-500">Order Summary</li>
          </ol>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 mb-4 border rounded">
            <h2 className="font-bold mb-2">Delivery Address</h2>
            {address ? (
              <>
                <p className="font-medium">
                  {address.first_name} {address.last_name}
                </p>
                <p className="text-sm text-gray-600">
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.country} - {address.zipcode}
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No address found</p>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Order Items ({cartItems.length})
          </h1>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 mb-4 border-b border-gray-300">
              <div className="flex gap-4">
                <div className="w-24">
                  <Image src="/pro7.jpg" alt={item.name} width={100} height={100} className="rounded" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Code: <b>{item.code}</b> <br />
                    Size: <b>{item.size}</b>, Color: <b>{item.color}</b>
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p>
                      Qty: <b>{item.qty}</b>
                    </p>
                    <p className="font-medium">
                      AED {item.price * item.qty}
                    </p>
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
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {shipping?.shipping_type} (AED {shippingCharge})
                </span>
              </div>
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
            <div className="mt-4">
              <Link href="/payment" className="w-full block text-center bg-[#a68849] text-white py-2 rounded hover:bg-gray-600 transition duration-200">
                <button className="w-full bg-[#a68849] text-white py-2 rounded hover:bg-gray-600 cursor-pointer transition duration-200 font-semibold px-4">
                  Proceed to Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}