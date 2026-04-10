"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { addAddressAPI, getAddressAPI, saveTempAddressAPI, getTempAddressAPI, selectAddressAPI } from "@/services/addressService"
import { useNotification } from "@/context/NotificationContext"
import { getCountries, getCitiesByStateId, getStatesByCountryId } from "@/services/locationService"

export default function CheckoutPage() {
  const { addNotification } = useNotification()

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    landmark: ""
  })
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [addresses, setAddresses] = useState([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showGuest, setShowGuest] = useState(true)
  const { isLoggedIn } = useAuthContext()
  const router = useRouter()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCountryChange = async (e) => {
    const countryId = e.target.value
    setSelectedCountry(countryId)

    setForm({
      ...form,
      country: countryId,
      state: "",
      city: ""
    })

    try {
      setLoadingStates(true)
      const data = await getStatesByCountryId(countryId)
      setStates(data)
      setCities([]) // reset cities
    } catch (err) {
      addNotification("Failed to load states", "error")
    } finally {
      setLoadingStates(false)
    }
  }

  const handleStateChange = async (e) => {
    const stateId = e.target.value
    setSelectedState(stateId)

    setForm({
      ...form,
      state: stateId,
      city: ""
    })

    try {
      setLoadingCities(true)
      const data = await getCitiesByStateId(stateId)
      setCities(data)
    } catch (err) {
      addNotification("Failed to load cities", "error")
    } finally {
      setLoadingCities(false)
    }
  }

  const handleCityChange = (e) => {
    const cityId = e.target.value

    setForm({
      ...form,
      city: cityId
    })
  }

  const handleSubmit = async () => {
    try {
      if (!form.first_name || !form.mobile || !form.address) {
        return addNotification("Please fill required fields", "error")
      }

      const payload = {
        ...form,
        address_type: "Ship"
      }

      if (isLoggedIn) {
        if (editingId) {
          await API.put(`/address/update/${editingId}`, payload)
          addNotification("Address updated ✅")
        } else {
          await addAddressAPI(payload)
          addNotification("Address added ✅")
        }

        const res = await getAddressAPI()
        setAddresses(res.data)

        setEditingId(null)
      } else {
        await saveTempAddressAPI(payload)
        addNotification("Delivery address saved ✅")
      }

      setForm({
        email: "",
        first_name: "",
        last_name: "",
        mobile: "",
        address: "",
        state: "",
        city: "",
        zipcode: "",
        landmark: ""
      })

    } catch (err) {
      addNotification(err.message, "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAddressAPI(id)

      setAddresses((prev) => prev.filter((a) => a.address_id !== id))

      addNotification("Address deleted ✅")
    } catch (err) {
      addNotification("Delete failed", "error")
    }
  }

  const handleEdit = (addr) => {
    setForm(addr)
    setEditingId(addr.address_id)
  }

  useEffect(() => {
    const loadTemp = async () => {
      try {
        const res = await getTempAddressAPI()

        if (res.success && res.data.length > 0) {
          setForm(res.data[0])
        }

      } catch (err) {
        console.error(err)
      }
    }

    loadTemp()
  }, [])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true)
        const data = await getCountries()
        setCountries(data)
      } catch (err) {
        addNotification(err.message || "Failed to load countries", "error")
      } finally {
        setLoadingCountries(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true)
        const res = await getAddressAPI()

        if (res.success) {
          setAddresses(res.data)
        }
      } catch (err) {
        addNotification("Failed to load addresses", "error")
      } finally {
        setLoadingAddresses(false)
      }
    }

    if (isLoggedIn) {
      fetchAddresses()
    }
  }, [isLoggedIn])

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
                  className={`w-4 h-4 mx-auto rounded-full mb-2 shadow ${i === 0
                    ? "bg-green-600"
                    : i === 1
                      ? "border-2 border-green-600 bg-white"
                      : "bg-gray-300"
                    }`}
                ></div>
                <span
                  className={`block ${i <= 1 ? "text-black" : "text-gray-400"
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
        {!isLoggedIn &&
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
                  href="/Login"
                  className="inline-block mt-3 bg-gray-800 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Click Here for Login
                </Link>
              </div>
            )}
          </div>
        }
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
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">First Name *</label>
                  <input type="text" name="first_name" value={form.first_name} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Contact No. *</label>
                  <input type="text" name="mobile" value={form.mobile} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div className="col-span-3">
                  <label className="block mb-1">Address *</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Country *</label>
                  <select
                    className="border border-gray-300 rounded-lg p-2 w-full text-gray-600"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => {
                      return (
                        <option key={c.id} value={c.id}>
                          {c.country_name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">State *</label>
                  <select
                    className="border border-gray-300 rounded-lg p-2 w-full text-gray-600"
                    onChange={handleStateChange}
                    value={selectedState}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">City *</label>
                  <select
                    className="border border-gray-300 rounded-lg p-2 w-full text-gray-600"
                    onChange={handleCityChange}
                    disabled={!selectedState}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
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

              <button
                onClick={handleSubmit}
                className="mt-4 bg-[#a68849] hover:bg-gray-600 text-white px-6 py-2 rounded"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {addresses.length === 0 && (
            <p className="text-gray-500 text-sm">No address found</p>
          )}

          {addresses.map((addr) => (
            <div
              key={addr.address_id}
              className={`border p-4 rounded-lg cursor-pointer ${selectedAddressId === addr.address_id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
                }`}
              onClick={() => setSelectedAddressId(addr.address_id)}
            >
              <div className="flex gap-3">
                <div>📍</div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">Address</p>
                  </div>

                  <p className="mt-2 font-medium">
                    {addr.first_name} {addr.last_name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {addr.address}, {addr.city}, {addr.state}, {addr.country} -{" "}
                    {addr.zipcode}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(addr)}
                      className="border border-yellow-600 text-yellow-600 px-3 py-1 rounded-full text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(addr.address_id)}
                      className="border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/OrderSummary">
            <button
              onClick={async () => {
                console.log("CLICKED", selectedAddressId)
                if (!selectedAddressId) {
                  return addNotification("Please select address", "error")
                }

                try {
                  await selectAddressAPI(selectedAddressId)

                  router.push("/OrderSummary")
                } catch (err) {
                  addNotification("Failed to proceed", "error")
                }
              }}
              className="bg-[#b39e74] text-white px-6 py-2 rounded cursor-pointer"
            >
              View Order Summary
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
