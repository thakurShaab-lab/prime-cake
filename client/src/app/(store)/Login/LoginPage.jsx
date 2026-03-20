"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import ForgotPasswordModal from "@/components/ForgotPassword"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { login, loading } = useAuth()
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {

        if (!form.email || !form.password) {
            return
        }

        try {
            await login(form)

            setTimeout(() => {
                router.replace("/myaccount")
            }, 1000)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="bg-[#f5f5f5]">
                <nav className="bg-[#f2eee7] py-3">
                    <div className="max-w-7xl mx-auto px-4">
                        <ol className="flex text-sm text-gray-600 space-x-2">
                            <li>
                                <Link href="/" className="hover:underline text-[#a68849]">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-800 font-medium">Login</li>
                        </ol>
                    </div>
                </nav>
                <div className="py-10">
                    <div className="max-w-md mx-auto bg-linear-to-t from-white via-[#efefef] to-[#f9f6f1] border-2 border-[#dddad3] rounded-2xl shadow-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Sign In
                        </h1>
                        <div className="space-y-3">
                            <div className="relative border border-[#a68849] shadow-lg rounded-lg">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Image src="/email.svg" alt="email" width={20} height={20} />
                                </span>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Email or Mobile *"
                                    className="w-full pl-10 pr-3 py-3 bg-transparent outline-none rounded-lg"
                                />
                            </div>
                            <div className="relative border border-[#a68849] shadow-lg rounded-lg">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Image src="/password.svg" alt="password" width={20} height={20} />
                                </span>
                                <input
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password *"
                                    className="w-full pl-10 pr-3 py-3 bg-transparent outline-none rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <span>Remember Me</span>
                                </label>

                                <button onClick={() => setOpen(true)} className="text-red-600 hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-600 transition"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                        <div className="text-sm mt-4 text-center">
                            Don't have an account?{" "}
                            <Link href="/Signup" className="text-red-600 font-semibold">
                                Sign Up
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            <ForgotPasswordModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    )
}