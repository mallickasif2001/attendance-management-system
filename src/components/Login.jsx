import { useState } from "react"

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 👇 allowed teachers
  const users = {
    teacher01: "1234",
    teacher02: "5678",
    teacher03: "4863",
  }

  const handleLogin = () => {
    if (users[userId] === password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userId", userId)
      onLogin()
    } else {
      setError("Invalid User ID or Password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          Teacher Login
        </h2>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  )
}
