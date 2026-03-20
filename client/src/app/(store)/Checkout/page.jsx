"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showGuest, setShowGuest] = useState(true);

  return (
    <div className="pb-10">
      <div className="bg-[#f2eee7] py-3 border-b">
        <div className="max-w-6xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-[#a68849]">Home</Link> / <span>Checkout</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <ul className="flex justify-between text-center text-sm mb-6">
          {["Shopping Cart", "Checkout", "Order Summary", "Payment"].map(
            (step, i) => (
              <li key={i} className="flex-1 relative">
                <div
                  className={`w-4 h-4 mx-auto rounded-full mb-2 shadow ${
                    i === 0
                      ? "bg-green-600"
                      : i === 1
                      ? "border-2 border-green-600 bg-white"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`block ${
                    i <= 1 ? "text-black" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </li>
            )
          )}
        </ul>
        <h1 className="text-2xl font-bold text-center mb-4">
          Delivery Information
        </h1>
        <div className="bg-linear-to-r from-[#3c331f] to-[#b39e74] p-4 rounded mb-4">
          <p
            onClick={() => setShowLogin(!showLogin)}
            className="text-white font-semibold cursor-pointer flex justify-between"
          >
            Returning customer?
            <span>{showLogin ? "-" : "+"}</span>
          </p>
          {showLogin && (
            <div className="bg-white p-4 rounded mt-3 text-sm">
              <p>
                If you have shopped with us before, please enter your details
                below.
              </p>
              <Link
                href="/login"
                className="inline-block mt-3 bg-gray-800 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Click Here for Login
              </Link>
            </div>
          )}
        </div>
        <div className="bg-linear-to-r from-[#3c331f] to-[#b39e74] p-4 rounded mb-4">
          <p
            onClick={() => setShowGuest(!showGuest)}
            className="text-white font-semibold cursor-pointer flex justify-between"
          >
            Checkout without Registering
            <span>{showGuest ? "-" : "+"}</span>
          </p>
          {showGuest && (
            <div className="bg-white p-4 rounded mt-3 text-sm">
              <p className="mb-4">
                If you are a new customer, please fill the details below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block mb-1">Email Address *</label>
                  <input type="email" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">First Name *</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Contact No. *</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div className="col-span-3">
                  <label className="block mb-1">Address *</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">State *</label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">City *</label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Location *</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Pin Code *</label>
                  <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
              </div>

              <button className="mt-4 bg-[#a68849] hover:bg-gray-600 text-white px-6 py-2 rounded">
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
          <div className="flex gap-3">
            <div>📍</div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-semibold">Address</p>
              </div>

              <p className="mt-2 font-medium">Sabita Dahal</p>
              <p className="text-sm text-gray-600">
                33 & 33A, Rama Road, Industrial Area, Near Kirti Nagar Metro
                Station, New Delhi - 110015 (INDIA)
              </p>

              <div className="mt-3 flex gap-2">
                <button className="border border-yellow-600 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  Edit
                </button>
                <button className="border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            View Order Summary
          </button>
        </div>
      </div>
    </div>
  );
}
