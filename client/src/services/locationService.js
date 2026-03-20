export const getCountries = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}location/countries`)
  
    const data = await res.json()
  
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch countries")
    }
  
    return data.data
  }