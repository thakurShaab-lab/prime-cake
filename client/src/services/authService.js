const API_URL = process.env.NEXT_PUBLIC_API_URL

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Registration failed")
  }

  return result
}

export const loginUser = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!result.success) {
    throw new Error(result.message || "Login failed")
  }

  return result
}