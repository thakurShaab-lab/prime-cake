export default function ContactPage() {
    return (
        <div>
            <div>
                <img
                    src="/inner_bnr.jpg"
                    alt="Banner"
                    className="w-full"
                />
            </div>
            <div className="bg-[#f2eee7] py-2">
                <div className="max-w-330 mx-auto px-3">
                    <ol className="flex text-sm">
                        <li>
                            <a href="/" className="text-[#a68849]">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-500">Contact Us</li>
                    </ol>
                </div>
            </div>
            <div className="my-3">
                <div className="max-w-330 mx-auto px-3">
                    <h1 className="text-[2.2em] font-semibold text-[#231f20] mb-2">
                        Contact Us
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-lg mb-3">
                                <span className="text-red-500 font-semibold">
                                    Still need help?
                                </span>
                                <br />
                                <b className="text-sm">
                                    Just Fill the Below Information:
                                </b>
                            </p>
                            <hr className="mb-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm">Name *</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 border rounded px-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm">E-mail ID *</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 border rounded px-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm">Mobile No. *</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 border rounded px-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm">Phone No.</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 border rounded px-2"
                                    />
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block mb-1 text-sm">Enquiry *</label>
                                    <textarea
                                        rows="3"
                                        className="w-full border rounded px-2 py-2"
                                    ></textarea>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block mb-1 text-sm">
                                        Verification Code *
                                    </label>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <input
                                            type="text"
                                            className="w-30 h-11 border rounded px-2"
                                        />
                                        <img src="/captcha1.jpg" alt="code" />
                                        <img src="/ref.svg" alt="refresh" />
                                    </div>
                                    <small className="block mt-1 text-gray-500">
                                        Type the characters shown above.
                                    </small>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <button className="bg-[#a68849] text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">
                                        Submit
                                    </button>
                                    <button className="bg-gray-800 text-white px-4 py-2 rounded">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-4 text-black">
                                <div className="p-4 bg-white rounded-lg border shadow-sm">
                                    <p className="font-bold mb-1">Address</p>
                                    <div className="flex items-start text-[1.1em] mt-1">
                                        <img src="/location.svg" className="w-4.5 mt-1 mr-2" />
                                        <span>
                                            401-C02, Horizon Building, Deira, Dubai- UAE
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-lg border shadow-sm">
                                    <p className="font-bold mb-1">Call Customer Service:</p>
                                    <div className="flex items-start text-[1.1em] mt-1">
                                        <img src="/call.svg" className="w-4.5 mt-1 mr-2" />
                                        <a href="tel:+971505554990">
                                            +971505554990
                                        </a>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-lg border shadow-sm">
                                    <p className="font-bold mb-1">Email</p>
                                    <div className="flex items-start text-[1.1em] mt-1">
                                        <img src="/email.svg" className="w-4.5 mt-1 mr-2" />
                                        <a href="mailto:primecaketools@gmail.com">
                                            primecaketools@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 border-2 border-black">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31098.904564955777!2d77.66023329266744!3d13.012536034214868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAkshya%20Nagar%201st%20Block%201st%20Cross%2C%20Rammurthy%20nagar%2C%20Bangalore-560016!5e0!3m2!1sen!2sin!4v1720589246560!5m2!1sen!2sin"
                                    className="w-full h-62.5 md:h-87.5"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}