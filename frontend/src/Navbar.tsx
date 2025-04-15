import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-13 h-12 " src="../src/assets/bh-icon-big.png" alt="logo" />
          </Link>
          <h1 className="text-xl font-bold ml-4">BookHotel</h1>
        </div>
        <div className="flex space-x-6 text-xl">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/search" className="hover:underline">Wyszukaj nocleg</Link>
          <Link to="/createHotel" className="hover:underline">Dodaj nocleg</Link>
          <Link to="/register" className="hover:underline">Rejestracja</Link>
          <Link to="/login" className="hover:underline">Logowanie</Link>
        </div>
      </div>
    </nav>
  )
}