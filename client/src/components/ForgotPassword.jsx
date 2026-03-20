"use client"

export default function ForgotPasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full max-w-md rounded shadow-lg p-4 z-10">
        <h1 className="text-xl font-semibold mb-3">
          Forgot Password
        </h1>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="email@example.com *"
            className="w-full border px-3 h-9.75 text-sm rounded"
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Code *"
              className="w-28.75 border px-2 h-9.75 text-sm rounded"
            />
            <img src="/captcha1.jpg" className="h-8.75" />
            <img src="/ref.svg" className="w-6 h-6 cursor-pointer" />
          </div>
          <button className="bg-[#b89f6d] text-white px-4 py-2 mt-2 rounded">
            Submit
          </button>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-xl cursor-pointer">
          X
        </button>
      </div>
    </div>
  )
}