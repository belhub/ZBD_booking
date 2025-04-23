import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Pool } from "pg";
import * as reservationController from "./services/reservation.controller";
import * as authController from "./services/auth.controller";
import * as hotelController from "./services/hotel.controller";
dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// autoryzacja
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// pobranie terminów na podstawie zakresu dat oraz miasta
app.get("/api/hotel/getAvailableHotelsForDate/:city/:start_date/:end_date/:capacity", hotelController.getAvailableHotelsForDate);

// pobranie szczegółowych danych o hotelu wraz z wybranymi pokojami - roomIds
app.get("/api/hotel/getHotelDetails/:id/:roomIds", hotelController.getHotelDetails);

// app.get("/api/hotel/getHotelRooms/:id", hotelController.hotelRooms);

// utworzenie hotelu wraz z adresem
app.post("/api/hotel/createHotel", hotelController.createHotelWithAddress);

// edycja danych hotelu
app.put("/api/hotel/updateHotel/:id", hotelController.updateHotelInfo);

// rezerwacja pokoju
app.post("/api/reservation/createReservation", reservationController.createReservation);

//dokonanie płatności
app.post("/api/reservation/createPayment", reservationController.PayForReservations);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});