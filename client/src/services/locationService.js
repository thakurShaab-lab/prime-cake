export const getCountries = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}location/countries`)

  const data = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch countries")
  }

  return data.data
}

export const getStatesByCountryId = async (country_id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}location/states/${country_id}`
  )

  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch states")
  }

  return data.data
}

export const getCitiesByStateId = async (stateId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}location/cities/${stateId}`
  )

  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch cities")
  }

  return data.data
}