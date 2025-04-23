import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./login/Login";
import { Home } from "./homePage/Home";
import { SearchHotel } from "./hotel/SearchHotel";
import { Navbar } from "./Navbar";
import { CreateHotel } from "./hotel/CreateHotel";
import { HotelDetails } from "./hotel/HotelDetails";
import { Payment } from "./payment/Payment";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/search" element={<SearchHotel />} />
          <Route path="/createHotel" element={<CreateHotel />} />
          <Route path="/hotelDetails/:id/:start_date/:end_date/:roomIds" element={<HotelDetails />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
