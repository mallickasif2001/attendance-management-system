import { useState } from "react"

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // fake credentials
    if (userId === "teacher01" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userId", userId)
      onLogin()
    } else {
      setError("Invalid User ID or Password")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Teacher Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
