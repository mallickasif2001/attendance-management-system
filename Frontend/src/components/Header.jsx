import { useState } from "react"

export default function Header() {
  const userId = localStorage.getItem("userId")
  const [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userId")
    window.location.reload()
  }

  return (
    <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
      {/* Left side */}
      <div>
        <h1 className="text-xl font-bold">Root International Public School</h1>
        <p>Attendance Management System</p>
        <p>Nabi Nagar Kakrar Hussainabad Road</p>
        <p>Sheikhpura 811105, Bihar</p>
        <p className="text-sm mt-1"></p>
      </div>
      

      {/* Right side – Profile */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700"
        >
          <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
            {userId?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm">{userId}</span>
        </button>
        

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
