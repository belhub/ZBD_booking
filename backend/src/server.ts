import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Pool } from "pg";
import * as userService from "./services/user.controller";
import * as authController from "./services/auth.controller";
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


// autoryzacja
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.get("/api/users/getUsers", userService.getUsers);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});