import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Pool } from "pg";
import * as userController from "./services/user.controller";
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

// app.get("/api/users/getUsers", userController.getUsers);

// pobranie terminów na podstawie zakresu dat oraz miasta
app.get("/api/hotel/getAvailableHotelsForDate/:city/:start_date/:end_date", hotelController.getAvailableHotelsForDate);
app.get("/api/hotel/getHotelDetails/:id", hotelController.getHotelDetails);
app.post("/api/hotel/createHotel", hotelController.createHotelWithAddress);
app.put("/api/hotel/updateHotel/:id", hotelController.updateHotelInfo);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});