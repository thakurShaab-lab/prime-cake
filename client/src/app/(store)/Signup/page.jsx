"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  return (
    <div className="min-h-screen">
      <nav className="bg-[#f2eee7] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex text-sm text-gray-600 space-x-2">
            <li>
              <Link href="/" className="text-[#a68849] hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Register</li>
          </ol>
        </div>
      </nav>
      <div className="py-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div
            className="px-4 py-4 shadow"
            style={{ backgroundImage: "linear-gradient(to top, #ede0c5, #fff)" }}
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500">
              It's easy and takes less than 2 minutes
            </p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="col-span-2 font-semibold text-gray-700">
                Personal Information
              </p>
              <div>
                <label className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input className="w-full border border-gray-300 shadow rounded px-3 py-2 text-sm mt-1" placeholder="First Name *" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input className="w-full border border-gray-300 shadow rounded px-3 py-2 text-sm mt-1" placeholder="Last Name *" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input className="w-full border border-gray-300 shadow rounded px-3 py-2 text-sm mt-1" placeholder="Mobile Number *" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input className="w-full border border-gray-300 shadow rounded px-3 py-2 text-sm mt-1" placeholder="example@email.com *" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Country <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 shadow rounded px-3 py-2 text-sm mt-1">
                  <option>Select Country</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2 text-sm">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" defaultChecked />
                    Male
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" />
                    Female
                  </label>
                </div>
              </div>
              <p className="col-span-2 font-semibold text-gray-700 mt-4">
                Login Information
              </p>
              <div className="relative">
                <label className="text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full border-gray-300 shadow rounded px-3 py-2 text-sm mt-1 pr-10" placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <label className="text-sm font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className="w-full border-gray-300 shadow rounded px-3 py-2 text-sm mt-1 pr-10"
                  placeholder="Confirmed Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium block">
                  Verification Code <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="Enter Code *"
                    className="border-gray-300 shadow-lg rounded px-3 py-2 text-sm w-32"
                  />
                  <Image src="/captcha1.jpg" width={100} height={40} alt="captcha" />
                  <Image src="/ref2.svg" width={25} height={25} alt="refresh" className="cursor-pointer" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Type the characters shown above.
                </p>
              </div>
              <div className="col-span-2 space-y-2 text-sm mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Sign Up for Newsletter
                </label>
                <label className="flex items-center gap-2 flex-wrap">
                  <input type="checkbox" />
                  I accept all
                  <Link href="/Terms&Conditions" className="text-[#a68849]">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <div className="col-span-2 mt-3">
                <button
                  className="bg-[#a68849] text-white px-6 py-2 rounded font-semibold uppercase hover:bg-[#f2eee7] hover:text-[#a68849]"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#f2eee7] text-center text-sm py-3 shadow">
            Already have an account?{" "}
            <Link href="/Login" className="text-[#a68849] font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}