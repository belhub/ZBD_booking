import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./login/Login";
import { Home } from "./homePage/Home";
import { SearchHotel } from "./hotel/SearchHotel";
import { Navbar } from "./Navbar";
import { CreateHotel } from "./hotel/CreateHotel";
import { HotelDetails } from "./hotel/HotelDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/search" element={<SearchHotel />} />
          <Route path="/createHotel" element={<CreateHotel />} />
          <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
